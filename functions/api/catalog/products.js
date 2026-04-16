const json = (data, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    },
  });
};

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function onRequestGet(context) {
  try {
    const { request, env } = context;
    const url = new URL(request.url);
    
    // Filters
    const categorySlug = url.searchParams.get('category');
    const subcategorySlug = url.searchParams.get('subcategory');
    const searchQuery = url.searchParams.get('q');
    const featured = url.searchParams.get('featured') === 'true';
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    if (!env.mercacuba_store) {
      return json({ ok: false, error: 'Binding D1 no configurado.' }, 500);
    }

    let query = `
      SELECT p.*, c.name as category_name, s.name as subcategory_name 
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN subcategories s ON p.subcategory_id = s.id
      WHERE p.status = 'active'
    `;
    const params = [];

    if (categorySlug) {
      query += ` AND c.slug = ?`;
      params.push(categorySlug);
    }

    if (subcategorySlug) {
      query += ` AND s.slug = ?`;
      params.push(subcategorySlug);
    }

    if (searchQuery) {
      query += ` AND (p.name LIKE ? OR p.description LIKE ?)`;
      params.push(`%${searchQuery}%`, `%${searchQuery}%`);
    }

    if (featured) {
      query += ` AND p.is_featured = 1`;
    }

    query += ` ORDER BY p.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const result = await env.mercacuba_store
      .prepare(query)
      .bind(...params)
      .all();

    return json({
      ok: true,
      products: result.results,
      meta: {
        count: result.results.length,
        limit,
        offset
      }
    });
  } catch (error) {
    return json({ ok: false, error: 'No se pudieron cargar los productos.', detail: String(error?.message || error) }, 500);
  }
}
