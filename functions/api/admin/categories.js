const json = (data, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function onRequestGet(context) {
  const { env } = context;
  try {
    const categories = await env.mercacuba_store
      .prepare('SELECT * FROM categories ORDER BY display_order ASC, name ASC')
      .all();
    return json({ ok: true, categories: categories.results });
  } catch (error) {
    return json({ ok: false, error: 'Failed to fetch categories' }, 500);
  }
}

export async function onRequestPost(context) {
  const { env, request } = context;
  try {
    const body = await request.json();
    const { name, slug, image_url, display_order } = body;
    
    if (!name || !slug) return json({ ok: false, error: 'Name and slug are required' }, 400);

    const id = crypto.randomUUID();
    await env.mercacuba_store
      .prepare('INSERT INTO categories (id, name, slug, image_url, display_order) VALUES (?, ?, ?, ?, ?)')
      .bind(id, name, slug, image_url || null, display_order || 0)
      .run();

    return json({ ok: true, id });
  } catch (error) {
    return json({ ok: false, error: String(error) }, 500);
  }
}

export async function onRequestPut(context) {
  const { env, request } = context;
  try {
    const body = await request.json();
    const { id, name, slug, image_url, display_order, status } = body;
    
    if (!id) return json({ ok: false, error: 'ID is required' }, 400);

    await env.mercacuba_store
      .prepare('UPDATE categories SET name = ?, slug = ?, image_url = ?, display_order = ?, status = ? WHERE id = ?')
      .bind(name, slug, image_url, display_order, status || 'active', id)
      .run();

    return json({ ok: true });
  } catch (error) {
    return json({ ok: false, error: String(error) }, 500);
  }
}

export async function onRequestDelete(context) {
  const { env, request } = context;
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) return json({ ok: false, error: 'ID is required' }, 400);

    // Deactivate instead of hard delete to preserve historical integrity
    await env.mercacuba_store
      .prepare('UPDATE categories SET status = "inactive" WHERE id = ?')
      .bind(id)
      .run();

    return json({ ok: true });
  } catch (error) {
    return json({ ok: false, error: String(error) }, 500);
  }
}
