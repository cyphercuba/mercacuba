export const categories = [
  { id: 'combos', name: 'Combos Listos', icon: 'package' },
  { id: 'alimentos', name: 'Alimentos', icon: 'shopping-bag' },
  { id: 'aseo', name: 'Aseo e Higiene', icon: 'droplet' },
  { id: 'electro', name: 'Electrodomésticos', icon: 'tv' },
  { id: 'bebes', name: 'Bebés', icon: 'baby' },
];

export const products = [
  {
    id: 'p1',
    name: 'Bicicleta Eléctrica',
    categoryId: 'bicicletas-electricas',
    price: 850.00,
    deliveryTime: '7-14 días',
    image: '/electric_bike.png',
    description: 'Bicicleta eléctrica moderna, alta autonomía y resistencia.'
  },
  {
    id: 'p2',
    name: 'Moto de Gasolina',
    categoryId: 'motos-de-gasolina',
    price: 1500.00,
    deliveryTime: '15-30 días',
    image: '/gas_motorcycle.png',
    description: 'Moto deportiva 150cc, excelente rendimiento de combustible.'
  },
  {
    id: 'p3',
    name: 'Planta Eléctrica 3200W',
    categoryId: 'plantas-electricas',
    price: 650.00,
    deliveryTime: '7-14 días',
    image: '/generator.png',
    description: 'Generador eléctrico a gasolina, ideal para el hogar.'
  },
  {
    id: 'p4',
    name: 'Aire Acondicionado Split',
    categoryId: 'aires-acondicionados',
    price: 450.00,
    deliveryTime: '7-14 días',
    image: '/air_conditioner.png',
    description: 'Aire acondicionado tipo Split 12000 BTU Inverter.'
  },
  {
    id: 'p5',
    name: 'Colchón Ortopédico',
    categoryId: 'colchones',
    price: 220.00,
    deliveryTime: '7-14 días',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=400&q=80',
    description: 'Colchón matrimonial tamaño Queen, ultra confortable.'
  },
  {
    id: 'p6',
    name: 'Artículos del Hogar (Set 12pz)',
    categoryId: 'articulos-del-hogar',
    price: 35.00,
    deliveryTime: '2-5 días',
    image: 'https://images.unsplash.com/photo-1585250007208-8e6d628ebbc1?auto=format&fit=crop&w=400&q=80',
    description: 'Set de recipientes de cristal con tapa hermética.'
  },
  {
    id: 'p7',
    name: 'Caja de Pollo 15kg',
    categoryId: 'alimentos',
    price: 35.00,
    deliveryTime: '24-48 horas',
    image: '/chicken_box.png',
    description: 'Pollo entero congelado. Venta mayorista por caja.'
  },
  {
    id: 'p8',
    name: 'Lomo de Cerdo Envasado',
    categoryId: 'alimentos',
    price: 40.00,
    deliveryTime: '24-48 horas',
    image: '/pork_meat.png',
    description: 'Carne de cerdo (lomo) de primera calidad empacado al vacío.'
  },
  {
    id: 'p9',
    name: 'Saco de Arroz Premium 50 lbs',
    categoryId: 'alimentos',
    price: 30.00,
    deliveryTime: '2-5 días',
    image: '/rice_sack.png',
    description: 'Saco de arroz blanco de grano largo extra por mayor.'
  },
  {
    id: 'p10',
    name: 'Gran Combo Familiar 30 Días',
    categoryId: 'combos',
    price: 150.00,
    deliveryTime: '24-48 horas',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400&h=300',
    description: '20lb pollo, 15lb arroz, aceite, frijoles, viandas y aseo básico.'
  },
  {
    id: 'p11',
    name: 'Módulo Aseo Personal y Limpieza',
    categoryId: 'aseo-e-higiene',
    price: 25.00,
    deliveryTime: '24-48 horas',
    image: '/hygiene_combo.png',
    description: 'Champú, desodorante, pasta dental, jabones y detergente.'
  },
  {
    id: 'p12',
    name: 'Pallet Mayorista Mixto',
    categoryId: 'mayorista',
    price: 850.00,
    deliveryTime: '3-7 días',
    image: '/wholesale_pallet.png',
    description: 'Pallet sellado con 50 bultos mixtos (alimentos, aseo) para negocios.'
  }
];
