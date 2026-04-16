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

  // Admin Check
  const user = await env.mercacuba_store
    .prepare('SELECT user_id, role FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.id = ? AND s.expires_at > datetime("now") LIMIT 1')
    .bind(sessionId)
    .first();

  if (!user || user.role !== 'admin') {
    return json({ ok: false, error: 'Acceso denegado' }, 403);
  }

  // GET: List all products for admin
  if (request.method === 'GET') {
    try {
      const products = await env.mercacuba_store
        .prepare('SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id ORDER BY p.created_at DESC')
        .all();
      return json({ ok: true, products: products.results });
    } catch (e) {
      return json({ ok: false, error: 'Error al listar productos', detail: e.message }, 500);
    }
  }

  // POST: Create product
  if (request.method === 'POST') {
    try {
      const body = await request.json();
      const id = createId();
      const { name, categoryId, subcategoryId, description, price, salePrice, stock, imageUrl, isFeatured } = body;
      
      const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now().toString().slice(-4);

      await env.mercacuba_store
        .prepare(`
          INSERT INTO products (
            id, category_id, subcategory_id, name, slug, description, price, sale_price, stock, image_url, is_featured, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
        `)
        .bind(id, categoryId, subcategoryId || null, name, slug, description, price, salePrice || null, stock, imageUrl || null, isFeatured ? 1 : 0)
        .run();

      return json({ ok: true, id }, 201);
    } catch (e) {
      return json({ ok: false, error: 'Error al crear producto', detail: e.message }, 500);
    }
  }

  // PUT: Update product
  if (request.method === 'PUT') {
    try {
      const body = await request.json();
      const { id, name, categoryId, subcategoryId, description, price, salePrice, stock, imageUrl, isFeatured, status } = body;

      await env.mercacuba_store
        .prepare(`
          UPDATE products SET 
            category_id = ?, subcategory_id = ?, name = ?, description = ?, 
            price = ?, sale_price = ?, stock = ?, image_url = ?, is_featured = ?, status = ?,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `)
        .bind(categoryId, subcategoryId || null, name, description, price, salePrice || null, stock, imageUrl || null, isFeatured ? 1 : 0, status, id)
        .run();

      return json({ ok: true });
    } catch (e) {
      return json({ ok: false, error: 'Error al actualizar producto', detail: e.message }, 500);
    }
  }

  // PATCH: Partial update for Quick Inventory
  if (request.method === 'PATCH') {
    try {
      const body = await request.json();
      const { id, stock, status } = body;
      
      if (!id) return json({ ok: false, error: 'ID requerido' }, 400);

      const updates = [];
      const values = [];
      
      if (stock !== undefined) {
        updates.push('stock = ?');
        values.push(stock);
      }
      if (status !== undefined) {
        updates.push('status = ?');
        values.push(status);
      }
      
      if (updates.length > 0) {
        values.push(id);
        await env.mercacuba_store
          .prepare(`UPDATE products SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`)
          .bind(...values)
          .run();
      }

      return json({ ok: true });
    } catch (e) {
      return json({ ok: false, error: 'Error en actualización rápida', detail: e.message }, 500);
    }
  }

  // DELETE: Soft delete (set status inactive)
  if (request.method === 'DELETE') {
    try {
      const url = new URL(request.url);
      const id = url.searchParams.get('id');
      await env.mercacuba_store
        .prepare('UPDATE products SET status = "inactive" WHERE id = ?')
        .bind(id)
        .run();
      return json({ ok: true });
    } catch (e) {
      return json({ ok: false, error: 'Error al eliminar producto', detail: e.message }, 500);
    }
  }

  return json({ ok: false, error: 'Método no permitido' }, 405);
}
