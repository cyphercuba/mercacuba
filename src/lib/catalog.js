/**
 * Catalog API library for MercadoCuba
 */

export async function getCategories() {
  try {
    const response = await fetch('/api/catalog/categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { ok: false, error: 'Network error' };
  }
}

export async function getProducts(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.subcategory) params.append('subcategory', filters.subcategory);
    if (filters.q) params.append('q', filters.q);
    if (filters.featured) params.append('featured', 'true');
    if (filters.limit) params.append('limit', filters.limit);
    if (filters.offset) params.append('offset', filters.offset);

    const qs = params.toString();
    const response = await fetch(`/api/catalog/products${qs ? '?' + qs : ''}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return { ok: false, error: 'Network error' };
  }
}

export async function getAddresses() {
  try {
    const response = await fetch('/api/account/addresses');
    return await response.json();
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return { ok: false, error: 'Network error' };
  }
}

export async function createAddress(addressData) {
  try {
    const response = await fetch('/api/account/addresses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addressData)
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Network error' };
  }
}

export async function updateAddress(addressData) {
  try {
    const response = await fetch('/api/account/addresses', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addressData)
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Network error' };
  }
}

export async function deleteAddress(addressId) {
  try {
    const response = await fetch(`/api/account/addresses?id=${addressId}`, {
      method: 'DELETE'
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Network error' };
  }
}

export async function updateProfile(profileData) {
  try {
    const response = await fetch('/api/account/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Network error' };
  }
}

export async function getOrders() {
  try {
    const response = await fetch('/api/account/orders');
    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Network error' };
  }
}

export async function getAdminStats() {
  try {
    const response = await fetch('/api/admin/stats');
    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Network error' };
  }
}

export async function getAdminProducts() {
  try {
    const response = await fetch('/api/admin/products');
    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Network error' };
  }
}

export async function createAdminProduct(productData) {
  try {
    const response = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Network error' };
  }
}

export async function updateAdminProduct(productData) {
  try {
    const response = await fetch('/api/admin/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Network error' };
  }
}

export async function deleteAdminProduct(productId) {
  try {
    const response = await fetch(`/api/admin/products?id=${productId}`, {
      method: 'DELETE'
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Network error' };
  }
}

export async function patchAdminProduct(productId, patchData) {
  try {
    const response = await fetch('/api/admin/products', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: productId, ...patchData })
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Network error' };
  }
}

// Categories Admin
export async function getAdminCategories() {
  try {
    const response = await fetch('/api/admin/categories');
    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Network error' };
  }
}

export async function createAdminCategory(data) {
  try {
    const response = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Network error' };
  }
}

export async function updateAdminCategory(data) {
  try {
    const response = await fetch('/api/admin/categories', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Network error' };
  }
}

export async function deleteAdminCategory(id) {
  try {
    const response = await fetch(`/api/admin/categories?id=${id}`, {
      method: 'DELETE'
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Network error' };
  }
}

// Subcategories Admin
export async function getAdminSubcategories() {
  try {
    const response = await fetch('/api/admin/subcategories');
    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Network error' };
  }
}

export async function createAdminSubcategory(data) {
  try {
    const response = await fetch('/api/admin/subcategories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Network error' };
  }
}

export async function updateAdminSubcategory(data) {
  try {
    const response = await fetch('/api/admin/subcategories', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Network error' };
  }
}

export async function deleteAdminSubcategory(id) {
  try {
    const response = await fetch(`/api/admin/subcategories?id=${id}`, {
      method: 'DELETE'
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Network error' };
  }
}
