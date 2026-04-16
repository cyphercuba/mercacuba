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

const createId = () => crypto.randomUUID();

export async function onRequest(context) {
  const { request, env } = context;
  const sessionId = getCookieValue(request, 'mercacuba_session');
  
  if (!sessionId) {
    return json({ ok: false, error: 'No autorizado' }, 401);
  }

  // Get user from session
  const user = await env.mercacuba_store
    .prepare('SELECT user_id FROM sessions WHERE id = ? AND expires_at > datetime("now") LIMIT 1')
    .bind(sessionId)
    .first();

  if (!user) {
    return json({ ok: false, error: 'Sesión expirada' }, 401);
  }

  const userId = user.user_id;

  // GET ALL ADDRESSES
  if (request.method === 'GET') {
    const addresses = await env.mercacuba_store
      .prepare('SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, created_at DESC')
      .bind(userId)
      .all();
    return json({ ok: true, addresses: addresses.results });
  }

  // CREATE ADDRESS
  if (request.method === 'POST') {
    const body = await request.json();
    const id = createId();
    const { 
      label, recipientName, phone, country = 'Cuba', province, city, municipality, addressLine1, addressLine2, isDefault 
    } = body;

    // Simple validation
    if (!recipientName || !province || !addressLine1) {
      return json({ ok: false, error: 'Campos obligatorios faltantes (Receptor, Provincia, Dirección)' }, 400);
    }

    if (isDefault) {
      await env.mercacuba_store
        .prepare('UPDATE addresses SET is_default = 0 WHERE user_id = ?')
        .bind(userId)
        .run();
    }

    try {
      await env.mercacuba_store
        .prepare(`
          INSERT INTO addresses (
            id, user_id, label, recipient_name, phone, country, province, 
            city, municipality, address_line_1, address_line_2, is_default
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `)
        .bind(
          id, userId, label, recipientName, phone, country, province, 
          city, municipality, addressLine1, addressLine2, isDefault ? 1 : 0
        )
        .run();

      return json({ ok: true, id }, 201);
    } catch (e) {
      return json({ ok: false, error: 'Error al crear la dirección', detail: e.message }, 500);
    }
  }

  // UPDATE ADDRESS
  if (request.method === 'PUT') {
    const body = await request.json();
    const { 
      id, label, recipientName, phone, country, province, city, municipality, addressLine1, addressLine2, isDefault 
    } = body;

    if (!id) return json({ ok: false, error: 'ID de dirección requerido' }, 400);

    if (isDefault) {
      await env.mercacuba_store
        .prepare('UPDATE addresses SET is_default = 0 WHERE user_id = ?')
        .bind(userId)
        .run();
    }

    try {
      await env.mercacuba_store
        .prepare(`
          UPDATE addresses SET 
            label = ?, recipient_name = ?, phone = ?, country = ?, province = ?, 
            city = ?, municipality = ?, address_line_1 = ?, address_line_2 = ?, is_default = ?
          WHERE id = ? AND user_id = ?
        `)
        .bind(
          label, recipientName, phone, country, province, 
          city, municipality, addressLine1, addressLine2, isDefault ? 1 : 0,
          id, userId
        )
        .run();

      return json({ ok: true });
    } catch (e) {
      return json({ ok: false, error: 'Error al actualizar la dirección', detail: e.message }, 500);
    }
  }

  // DELETE ADDRESS
  if (request.method === 'DELETE') {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) return json({ ok: false, error: 'ID de dirección requerido' }, 400);

    try {
      await env.mercacuba_store
        .prepare('DELETE FROM addresses WHERE id = ? AND user_id = ?')
        .bind(id, userId)
        .run();
      return json({ ok: true });
    } catch (e) {
      return json({ ok: false, error: 'Error al eliminar la dirección', detail: e.message }, 500);
    }
  }

  return json({ ok: false, error: 'Método no permitido' }, 405);
}
