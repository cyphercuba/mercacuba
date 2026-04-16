const json = (data, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};

function getCookieValue(request, name) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? match[1] : null;
}

export async function onRequest(context) {
  const { request, env } = context;
  const sessionId = getCookieValue(request, 'mercacuba_session');
  
  if (!sessionId) {
    return json({ ok: false, error: 'No autorizado' }, 401);
  }

  // Get user from session
  const session = await env.mercacuba_store
    .prepare('SELECT user_id FROM sessions WHERE id = ? AND expires_at > datetime("now") LIMIT 1')
    .bind(sessionId)
    .first();

  if (!session) {
    return json({ ok: false, error: 'Sesión expirada' }, 401);
  }

  const userId = session.user_id;

  if (request.method === 'GET') {
    try {
      // Get orders for this user
      const ordersResult = await env.mercacuba_store
        .prepare(`
          SELECT o.*, a.address_line_1, a.city, a.province 
          FROM orders o
          JOIN addresses a ON o.address_id = a.id
          WHERE o.user_id = ?
          ORDER BY o.created_at DESC
        `)
        .bind(userId)
        .all();

      // Fetch items for each order? (Could be expensive, but let's do it for history detail)
      // For now, let's just return the orders summary.
      // If we need details, we can implement a /api/account/orders/[id] endpoint.

      return json({ ok: true, orders: ordersResult.results });
    } catch (e) {
      return json({ ok: false, error: 'Error al cargar los pedidos', detail: e.message }, 500);
    }
  }

  return json({ ok: false, error: 'Método no permitido' }, 405);
}
