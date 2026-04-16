-- Seed Categories
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('despensa', '🥫 Despensa', 'despensa', 1, 'active');
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('huevos-lacteos', '🥚 Huevos y Lácteos', 'huevos-lacteos', 2, 'active');
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('carnicos', '🥩 Cárnicos', 'carnicos', 3, 'active');
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('dulces-helados', '🍰 Dulces y Helados', 'dulces-helados', 4, 'active');
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('aseo-cuidado-personal', '🧴 Aseo y Cuidado Personal', 'aseo-cuidado-personal', 5, 'active');
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('cenas-bufets', '🍽️ Cenas y Bufets', 'cenas-bufets', 6, 'active');
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('electrodomesticos', '🔌 Electrodomésticos', 'electrodomesticos', 7, 'active');
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('pescados-mariscos', '🐟 Pescados y Mariscos', 'pescados-mariscos', 8, 'active');
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('bebidas', '🥤 Bebidas', 'bebidas', 9, 'active');
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('agro', '🌾 De Agro', 'agro', 10, 'active');
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('farmacia', '💊 Farmacia', 'farmacia', 11, 'active');
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('ferreteria', '🔧 Ferretería', 'ferreteria', 12, 'active');
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('alimentos-preelaborados', '🍕 Alimentos Preelaborados', 'alimentos-preelaborados', 13, 'active');
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('limpieza-utiles', '🧼 Limpieza y Útiles', 'limpieza-utiles', 14, 'active');
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('regalos', '🎁 Regalos', 'regalos', 15, 'active');
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('piezas-accesorios', '🛠️ Piezas y Accesorios', 'piezas-accesorios', 16, 'active');
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('hogar-mobiliario', '🛋️ Hogar y Mobiliario', 'hogar-mobiliario', 17, 'active');
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('infantiles-escolares', '🎒 Infantiles y Escolares', 'infantiles-escolares', 18, 'active');
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('moda-accesorios', '👕 Moda y Accesorios', 'moda-accesorios', 19, 'active');
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('bebe', '👶 Bebé', 'bebe', 20, 'active');
INSERT OR REPLACE INTO categories (id, name, slug, display_order, status) VALUES ('otros', '📦 Otros', 'otros', 21, 'active');

-- Seed Subcategories (Examples for main categories)
-- Despensa
INSERT OR REPLACE INTO subcategories (id, category_id, name, slug, display_order) VALUES ('conservas', 'despensa', 'Conservas', 'conservas', 1);
INSERT OR REPLACE INTO subcategories (id, category_id, name, slug, display_order) VALUES ('aceites-salsas', 'despensa', 'Aceites y salsas', 'aceites-salsas', 2);
INSERT OR REPLACE INTO subcategories (id, category_id, name, slug, display_order) VALUES ('cafe-infusiones', 'despensa', 'Café e infusiones', 'cafe-infusiones', 3);
INSERT OR REPLACE INTO subcategories (id, category_id, name, slug, display_order) VALUES ('granos-legumbres', 'despensa', 'Granos y legumbres', 'granos-legumbres', 4);

-- Lácteos
INSERT OR REPLACE INTO subcategories (id, category_id, name, slug, display_order) VALUES ('huevos', 'huevos-lacteos', 'Huevos', 'huevos', 1);
INSERT OR REPLACE INTO subcategories (id, category_id, name, slug, display_order) VALUES ('lacteos', 'huevos-lacteos', 'Lácteos', 'lacteos', 2);

-- Cárnicos
INSERT OR REPLACE INTO subcategories (id, category_id, name, slug, display_order) VALUES ('carne-res', 'carnicos', 'Carne de res', 'carne-res', 1);
INSERT OR REPLACE INTO subcategories (id, category_id, name, slug, display_order) VALUES ('cerdo', 'carnicos', 'Cerdo', 'cerdo', 2);
INSERT OR REPLACE INTO subcategories (id, category_id, name, slug, display_order) VALUES ('pollo', 'carnicos', 'Pollo', 'pollo', 3);
INSERT OR REPLACE INTO subcategories (id, category_id, name, slug, display_order) VALUES ('embutidos', 'carnicos', 'Embutidos', 'embutidos', 4);
