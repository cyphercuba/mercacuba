-- Seed categories
INSERT OR IGNORE INTO categories (id, name, slug, image_url, display_order) VALUES
('cat_despensa', 'Despensa', 'despensa', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&h=200&q=80', 1),
('cat_carnicos', 'Cárnicos', 'carnicos', 'https://images.unsplash.com/photo-1607623273573-7494b7a70a84?auto=format&fit=crop&w=200&h=200&q=80', 2),
('cat_lacteos', 'Lácteos', 'lacteos', 'https://images.unsplash.com/photo-1550583724-1255818bae0a?auto=format&fit=crop&w=200&h=200&q=80', 3),
('cat_bebidas', 'Bebidas', 'bebidas', 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=200&h=200&q=80', 4),
('cat_aseo', 'Aseo y Limpieza', 'aseo-e-higiene', 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&w=200&h=200&q=80', 5);

-- Seed subcategories
INSERT OR IGNORE INTO subcategories (id, category_id, name, slug, display_order) VALUES
('sub_conservas', 'cat_despensa', 'Conservas', 'conservas', 1),
('sub_aceites', 'cat_despensa', 'Aceites y Salsas', 'aceites-y-salsas', 2),
('sub_pollo', 'cat_carnicos', 'Pollo', 'pollo', 1),
('sub_cerdo', 'cat_carnicos', 'Cerdo', 'cerdo', 2),
('sub_leche', 'cat_lacteos', 'Leche', 'leche', 1),
('sub_refrescos', 'cat_bebidas', 'Refrescos', 'refrescos', 1),
('sub_jabones', 'cat_aseo', 'Jabones y Aseo', 'jabones-y-aseo', 1);

-- Seed products
INSERT OR IGNORE INTO products (id, category_id, subcategory_id, name, slug, description, price, sale_price, image_url, stock, is_featured) VALUES
('prod_pollo_caja', 'cat_carnicos', 'sub_pollo', 'Caja de Pollo 15kg', 'caja-pollo-15kg', 'Caja de cuartos de pollo de alta calidad, origen EEUU.', 45.00, 39.99, '/caja de pollo.jpg', 100, 1),
('prod_aceite_soya', 'cat_despensa', 'sub_aceites', 'Aceite de Soya 1L', 'aceite-soya-1l', 'Aceite vegetal refinado, ideal para cocinar.', 3.50, NULL, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&h=300&q=80', 500, 1),
('prod_leche_polvo', 'cat_lacteos', 'sub_leche', 'Leche en Polvo 1kg', 'leche-en-polvo-1kg', 'Leche entera en polvo, enriquecida con vitaminas.', 12.00, NULL, 'https://images.unsplash.com/photo-1550583724-1255818bae0a?auto=format&fit=crop&w=300&h=300&q=80', 200, 1),
('prod_refresco_pack', 'cat_bebidas', 'sub_refrescos', 'Pack de Refrescos 24 uds', 'pack-refrescos-24', 'Latas de refresco de 355ml, sabores variados.', 18.00, 15.00, 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=300&h=300&q=80', 50, 0);
