const json = (data, status = 200, headers = {}) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...headers,
    },
  });
};

function getCookieValue(request, name) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? match[1] : null;
}

function clearSessionCookie() {
  return 'mercacuba_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0';
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const sessionId = getCookieValue(request, 'mercacuba_session');

    if (sessionId && env.mercacuba_store) {
      await env.mercacuba_store
        .prepare('DELETE FROM sessions WHERE id = ?')
        .bind(sessionId)
        .run();
    }

    return json({ ok: true }, 200, {
      'Set-Cookie': clearSessionCookie(),
    });
  } catch (error) {
    return json({ ok: false, error: 'No se pudo cerrar la sesión.', detail: String(error?.message || error) }, 500);
  }
}
