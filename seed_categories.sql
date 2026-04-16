-- Seed script for MercadoCuba Categories and Subcategories
-- This script repopulates the catalog hierarchy based on user requirements.

-- Clear existing categories cautiously (or comments if you want to keep data)
-- DELETE FROM subcategories;
-- DELETE FROM categories;

-- 1. Despensa
INSERT INTO categories (id, name, slug, display_order) VALUES (1, '🥫 Despensa', 'despensa', 10);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (1, 'Conservas', 'conservas', 1);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (1, 'Aceites y salsas', 'aceites-salsas', 2);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (1, 'Café e infusiones', 'cafe-infusiones', 3);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (1, 'Granos y legumbres', 'granos-legumbres', 4);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (1, 'Galletas', 'galletas', 5);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (1, 'Panadería', 'panaderia', 6);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (1, 'Confituras', 'confituras', 7);

-- 2. Huevos y Lácteos
INSERT INTO categories (id, name, slug, display_order) VALUES (2, '🥚 Huevos y Lácteos', 'huevos-lacteos', 20);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (2, 'Huevos', 'huevos', 1);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (2, 'Lácteos', 'lacteos', 2);

-- 3. Cárnicos
INSERT INTO categories (id, name, slug, display_order) VALUES (3, '🥩 Cárnicos', 'carnicos', 30);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (3, 'Carne de res', 'carne-res', 1);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (3, 'Cerdo', 'cerdo', 2);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (3, 'Pollo', 'pollo', 3);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (3, 'Cordero (Carnero)', 'cordero-carnero', 4);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (3, 'Embutidos', 'embutidos', 5);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (3, 'Cárnicos varios', 'carnicos-varios', 6);

-- 4. Dulces y Helados
INSERT INTO categories (id, name, slug, display_order) VALUES (4, '🍰 Dulces y Helados', 'dulces-helados', 40);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (4, 'Cakes y tartas', 'cakes-tartas', 1);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (4, 'Helados', 'helados', 2);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (4, 'Dulces caseros', 'dulces-caseros', 3);

-- 5. Aseo y Cuidado Personal
INSERT INTO categories (id, name, slug, display_order) VALUES (5, '🧴 Aseo y Cuidado Personal', 'aseo-cuidado-personal', 50);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (5, 'Productos de aseo', 'productos-aseo', 1);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (5, 'Perfumes', 'perfumes', 2);

-- 6. Cenas y Bufets
INSERT INTO categories (id, name, slug, display_order) VALUES (6, '🍽️ Cenas y Bufets', 'cenas-bufets', 60);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (6, 'Comidas preparadas', 'comidas-preparadas', 1);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (6, 'Catering / Bufet', 'catering-bufet', 2);

-- 7. Electrodomésticos
INSERT INTO categories (id, name, slug, display_order) VALUES (7, '🔌 Electrodomésticos', 'electrodomesticos', 70);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (7, 'Cocina', 'cocina', 1);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (7, 'Refrigeración', 'refrigeracion', 2);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (7, 'Lavado', 'lavado', 3);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (7, 'Pequeños electrodomésticos', 'pequenos-electrodomesticos', 4);

-- 8. Pescados y Mariscos
INSERT INTO categories (id, name, slug, display_order) VALUES (8, '🐟 Pescados y Mariscos', 'pescados-mariscos', 80);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (8, 'Pescados', 'pescados', 1);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (8, 'Mariscos', 'mariscos', 2);

-- 9. Bebidas
INSERT INTO categories (id, name, slug, display_order) VALUES (9, '🥤 Bebidas', 'bebidas', 90);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (9, 'Refrescos', 'refrescos', 1);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (9, 'Jugos', 'jugos', 2);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (9, 'Bebidas alcohólicas', 'bebidas-alcoholicas', 3);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (9, 'Agua', 'agua', 4);

-- 10. De Agro
INSERT INTO categories (id, name, slug, display_order) VALUES (10, '🌾 De Agro', 'agro', 100);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (10, 'Viandas', 'viandas', 1);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (10, 'Vegetales', 'vegetales', 2);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (10, 'Frutas', 'frutas', 3);

-- 11. Farmacia
INSERT INTO categories (id, name, slug, display_order) VALUES (11, '💊 Farmacia', 'farmacia', 110);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (11, 'Medicamentos', 'medicamentos', 1);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (11, 'Vitaminas', 'vitaminas', 2);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (11, 'Productos médicos', 'productos-medicos', 3);

-- 12. Ferretería
INSERT INTO categories (id, name, slug, display_order) VALUES (12, '🔧 Ferretería', 'ferreteria', 120);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (12, 'Herramientas', 'herramientas', 1);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (12, 'Materiales de construcción', 'materiales-construccion', 2);

-- 13. Alimentos Preelaborados
INSERT INTO categories (id, name, slug, display_order) VALUES (13, '🍕 Alimentos Preelaborados', 'alimentos-preelaborados', 130);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (13, 'Pizzas', 'pizzas', 1);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (13, 'Comida rápida', 'comida-rapida', 2);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (13, 'Congelados', 'congelados-alimentos', 3);

-- 14. Limpieza y Útiles
INSERT INTO categories (id, name, slug, display_order) VALUES (14, '🧼 Limpieza y Útiles', 'limpieza-utiles', 140);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (14, 'Productos de limpieza', 'productos-limpieza', 1);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (14, 'Utensilios del hogar', 'utensilios-hogar', 2);

-- 15. Regalos
INSERT INTO categories (id, name, slug, display_order) VALUES (15, '🎁 Regalos', 'regalos', 150);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (15, 'Regalos para hombre', 'regalos-hombre', 1);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (15, 'Regalos para mujer', 'regalos-mujer', 2);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (15, 'Regalos para niños/as', 'regalos-ninos', 3);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (15, 'Flores', 'flores', 4);

-- 16. Piezas y Accesorios
INSERT INTO categories (id, name, slug, display_order) VALUES (16, '🛠️ Piezas y Accesorios', 'piezas-accesorios', 160);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (16, 'Repuestos', 'repuestos', 1);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (16, 'Accesorios varios', 'accesorios-varios', 2);

-- 17. Hogar y Mobiliario
INSERT INTO categories (id, name, slug, display_order) VALUES (17, '🛋️ Hogar y Mobiliario', 'hogar-mobiliario', 170);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (17, 'Muebles', 'muebles', 1);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (17, 'Decoración', 'decoracion', 2);

-- 18. Infantiles y Escolares
INSERT INTO categories (id, name, slug, display_order) VALUES (18, '🎒 Infantiles y Escolares', 'infantiles-escolares', 180);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (18, 'Útiles escolares', 'utiles-escolares', 1);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (18, 'Productos infantiles', 'productos-infantiles', 2);

-- 19. Moda y Accesorios
INSERT INTO categories (id, name, slug, display_order) VALUES (19, '👕 Moda y Accesorios', 'moda-accesorios', 190);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (19, 'Ropa', 'ropa', 1);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (19, 'Accesorios', 'accesorios-moda', 2);

-- 20. Bebé
INSERT INTO categories (id, name, slug, display_order) VALUES (20, '👶 Bebé', 'bebe', 200);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (20, 'Productos para bebé', 'productos-bebe', 1);

-- 21. Otros
INSERT INTO categories (id, name, slug, display_order) VALUES (21, '📦 Otros', 'otros', 210);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (21, 'Otros productos', 'otros-productos', 1);
INSERT INTO subcategories (category_id, name, slug, display_order) VALUES (21, 'Congelados y refrigerados', 'congelados-refrigerados', 2);
