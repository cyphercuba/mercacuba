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

    const firstName = (body.firstName || '').trim();
    const lastName = (body.lastName || '').trim();
    const email = normalizeEmail(body.email);
    const phone = (body.phone || '').trim();
    const password = body.password || '';

    if (!firstName || !lastName || !email || !password) {
      return json({ ok: false, error: 'Todos los campos obligatorios deben completarse.' }, 400);
    }

    if (!env.mercacuba_store) {
      return json({ ok: false, error: 'Binding D1 no configurado.' }, 500);
    }

    const existing = await env.mercacuba_store
      .prepare('SELECT id FROM users WHERE email = ? LIMIT 1')
      .bind(email)
      .first();

    if (existing) {
      return json({ ok: false, error: 'Ya existe una cuenta con ese correo.' }, 409);
    }

    const userId = createId();
    const passwordHash = await sha256(password);

    await env.mercacuba_store
      .prepare(`INSERT INTO users (id, first_name, last_name, email, phone, password_hash, role)
                VALUES (?, ?, ?, ?, ?, ?, 'customer')`)
      .bind(userId, firstName, lastName, email, phone, passwordHash)
      .run();

    const sessionId = createId();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString();

    await env.mercacuba_store
      .prepare('INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)')
      .bind(sessionId, userId, expiresAt)
      .run();

    return json(
      {
        ok: true,
        user: {
          id: userId,
          firstName,
          lastName,
          email,
          phone,
          role: 'customer',
        },
      },
      201,
      {
        'Set-Cookie': buildSessionCookie(sessionId),
      }
    );
  } catch (error) {
    return json({ ok: false, error: 'No se pudo crear la cuenta.', detail: String(error?.message || error) }, 500);
  }
}
