const json = (data, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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
    const subcategories = await env.mercacuba_store
      .prepare('SELECT * FROM subcategories ORDER BY category_id, display_order ASC')
      .all();
    return json({ ok: true, subcategories: subcategories.results });
  } catch (error) {
    return json({ ok: false, error: 'Failed' }, 500);
  }
}

export async function onRequestPost(context) {
  const { env, request } = context;
  try {
    const { category_id, name, slug, display_order } = await request.json();
    if (!category_id || !name || !slug) return json({ ok: false, error: 'Missing fields' }, 400);

    const id = crypto.randomUUID();
    await env.mercacuba_store
      .prepare('INSERT INTO subcategories (id, category_id, name, slug, display_order) VALUES (?, ?, ?, ?, ?)')
      .bind(id, category_id, name, slug, display_order || 0)
      .run();

    return json({ ok: true, id });
  } catch (error) {
    return json({ ok: false, error: String(error) }, 500);
  }
}

export async function onRequestPut(context) {
  const { env, request } = context;
  try {
    const { id, category_id, name, slug, display_order, status } = await request.json();
    await env.mercacuba_store
      .prepare('UPDATE subcategories SET category_id = ?, name = ?, slug = ?, display_order = ?, status = ? WHERE id = ?')
      .bind(category_id, name, slug, display_order, status || 'active', id)
      .run();
    return json({ ok: true });
  } catch (error) {
    return json({ ok: false, error: String(error) }, 500);
  }
}

export async function onRequestDelete(context) {
  const { env, request } = context;
  try {
    const id = new URL(request.url).searchParams.get('id');
    await env.mercacuba_store
      .prepare('UPDATE subcategories SET status = "inactive" WHERE id = ?')
      .bind(id)
      .run();
    return json({ ok: true });
  } catch (error) {
    return json({ ok: false, error: String(error) }, 500);
  }
}
