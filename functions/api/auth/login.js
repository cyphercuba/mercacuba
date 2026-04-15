const json = (data, status = 200, headers = {}) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...headers,
    },
  });
};

const normalizeEmail = (email = '') => email.trim().toLowerCase();
const createId = () => crypto.randomUUID();

async function sha256(input) {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function buildSessionCookie(sessionId, maxAge = 60 * 60 * 24 * 7) {
  return `mercacuba_session=${sessionId}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    const email = normalizeEmail(body.email);
    const password = body.password || '';

    if (!email || !password) {
      return json({ ok: false, error: 'Correo y contraseña son obligatorios.' }, 400);
    }

    if (!env.mercacuba_store) {
      return json({ ok: false, error: 'Binding D1 no configurado.' }, 500);
    }

    const user = await env.mercacuba_store
      .prepare('SELECT id, first_name, last_name, email, phone, password_hash, role FROM users WHERE email = ? LIMIT 1')
      .bind(email)
      .first();

    if (!user) {
      return json({ ok: false, error: 'Cuenta no encontrada.' }, 404);
    }

    const passwordHash = await sha256(password);
    if (passwordHash !== user.password_hash) {
      return json({ ok: false, error: 'Contraseña incorrecta.' }, 401);
    }

    const sessionId = createId();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString();

    await env.mercacuba_store
      .prepare('INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)')
      .bind(sessionId, user.id, expiresAt)
      .run();

    return json(
      {
        ok: true,
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      },
      200,
      {
        'Set-Cookie': buildSessionCookie(sessionId),
      }
    );
  } catch (error) {
    return json({ ok: false, error: 'No se pudo iniciar sesión.', detail: String(error?.message || error) }, 500);
  }
}
