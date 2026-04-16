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
