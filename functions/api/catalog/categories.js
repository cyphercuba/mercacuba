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
    const { env } = context;

    if (!env.mercacuba_store) {
      return json({ ok: false, error: 'Binding D1 no configurado.' }, 500);
    }

    // Fetch categories
    const categoriesRows = await env.mercacuba_store
      .prepare('SELECT id, name, slug, image_url, display_order FROM categories ORDER BY display_order ASC, name ASC')
      .all();

    // Fetch subcategories
    const subcategoriesRows = await env.mercacuba_store
      .prepare('SELECT id, category_id, name, slug, display_order FROM subcategories ORDER BY category_id, display_order ASC, name ASC')
      .all();

    // Build tree
    const tree = categoriesRows.results.map(cat => ({
      ...cat,
      subcategories: subcategoriesRows.results.filter(sub => sub.category_id === cat.id)
    }));

    return json({
      ok: true,
      categories: tree
    });
  } catch (error) {
    return json({ ok: false, error: 'No se pudieron cargar las categorías.', detail: String(error?.message || error) }, 500);
  }
}
