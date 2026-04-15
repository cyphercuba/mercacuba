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

export async function onRequestGet(context) {
  try {
    const { request, env } = context;

    if (!env.mercacuba_store) {
      return json({ ok: false, error: 'Binding D1 no configurado.' }, 500);
    }

    const sessionId = getCookieValue(request, 'mercacuba_session');
    if (!sessionId) {
      return json({ ok: false, user: null }, 401);
    }

    const row = await env.mercacuba_store
      .prepare(`SELECT u.id, u.first_name, u.last_name, u.email, u.phone, u.role
                FROM sessions s
                JOIN users u ON u.id = s.user_id
                WHERE s.id = ? AND s.expires_at > datetime('now')
                LIMIT 1`)
      .bind(sessionId)
      .first();

    if (!row) {
      return json({ ok: false, user: null }, 401);
    }

    return json({
      ok: true,
      user: {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        email: row.email,
        phone: row.phone,
        role: row.role,
      },
    });
  } catch (error) {
    return json({ ok: false, error: 'No se pudo validar la sesión.', detail: String(error?.message || error) }, 500);
  }
}
