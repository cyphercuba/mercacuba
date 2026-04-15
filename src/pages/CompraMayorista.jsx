import React from 'react';
import { Link } from 'react-router-dom';

const catalogCats = [
  { id: 'alimentos', name: 'Alimentos', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'bebidas', name: 'Bebidas', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'aseo-e-higiene', name: 'Higiene', image: '/hygiene_combo.png' },
  { id: 'ferreteria', name: 'Construcción', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'electrodomesticos', name: 'Electrodomésticos', image: 'https://images.unsplash.com/photo-1626806787426-5910811b6325?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'articulos-del-hogar', name: 'Hogar', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'otros', name: 'Más', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=200&h=200&q=80' },
];

const CompraMayorista = () => {
  return (
    <div className="container" style={{ padding: 'var(--spacing-8) var(--spacing-4)', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-brand-blue)', marginBottom: 'var(--spacing-2)', textAlign: 'center' }}>
        Compra Mayorista para MiPymes
      </h1>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-12)' }}>
        Seleccione la categoría de productos que desea importar por volumen
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-center">
        {catalogCats.map(cat => (
          <Link key={cat.id} to={`/catalogo?cat=${cat.id}`} className="flex flex-col items-center gap-2" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ padding: '4px', border: '2px solid var(--color-border)', width: '100%', aspectRatio: '1/1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s', cursor: 'pointer', overflow: 'hidden', maxWidth: '150px' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            </div>
            <span style={{ fontSize: '1rem', fontWeight: 600, textAlign: 'center', color: 'var(--color-primary)' }}>{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompraMayorista;
