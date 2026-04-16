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

  if (request.method === 'PATCH') {
    const body = await request.json();
    const { firstName, lastName, phone } = body;

    try {
      await env.mercacuba_store
        .prepare('UPDATE users SET first_name = ?, last_name = ?, phone = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
        .bind(firstName, lastName, phone, userId)
        .run();

      return json({ ok: true });
    } catch (e) {
      return json({ ok: false, error: 'Error al actualizar el perfil', detail: e.message }, 500);
    }
  }

  return json({ ok: false, error: 'Método no permitido' }, 405);
}
