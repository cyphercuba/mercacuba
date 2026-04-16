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
  const user = await env.mercacuba_store
    .prepare('SELECT user_id, role FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.id = ? AND s.expires_at > datetime("now") LIMIT 1')
    .bind(sessionId)
    .first();

  if (!user || user.role !== 'admin') {
    return json({ ok: false, error: 'Acceso denegado' }, 403);
  }

  if (request.method === 'GET') {
    try {
      // Aggregate stats
      const productCount = await env.mercacuba_store.prepare('SELECT COUNT(*) as total FROM products').first();
      const userCount = await env.mercacuba_store.prepare('SELECT COUNT(*) as total FROM users WHERE role = "customer"').first();
      const todayOrders = await env.mercacuba_store.prepare('SELECT COUNT(*) as total FROM orders WHERE date(created_at) = date("now")').first();
      const monthlySales = await env.mercacuba_store.prepare('SELECT SUM(total_amount) as total FROM orders WHERE created_at > date("now", "-1 month")').first();
      
      // Get stock alerts (stock < 10)
      const lowStock = await env.mercacuba_store.prepare('SELECT name, stock FROM products WHERE stock < 10 AND status = "active" LIMIT 5').all();

      return json({ 
        ok: true, 
        stats: {
          products: productCount.total,
          users: userCount.total,
          todayOrders: todayOrders.total,
          monthlySales: monthlySales.total || 0,
        },
        lowStock: lowStock.results
      });
    } catch (e) {
      return json({ ok: false, error: 'Error al cargar estadísticas', detail: e.message }, 500);
    }
  }

  return json({ ok: false, error: 'Método no permitido' }, 405);
}
