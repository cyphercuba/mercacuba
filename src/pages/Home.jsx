import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { ShieldCheck, Truck, Clock, Lock, ChevronRight, MessageCircle, MapPin } from 'lucide-react';

// New Icons simulation via emoji/colors since brand icons are removed
const catalogCats = [
  { id: 'alimentos', name: 'Alimentos', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'bebidas', name: 'Bebidas', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'aseo-e-higiene', name: 'Higiene', image: '/hygiene_combo.png' },
  { id: 'ferreteria', name: 'Construcción', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'electrodomesticos', name: 'Electrodomésticos', image: 'https://images.unsplash.com/photo-1626806787426-5910811b6325?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'articulos-del-hogar', name: 'Hogar', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'mayorista', name: 'Venta Mayorista', image: '/wholesale_pallet.png' },
  { id: 'otros', name: 'Más', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=200&h=200&q=80' },
];

const Home = () => {
  const { addToCart } = useCart();

  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative',
        backgroundColor: 'var(--color-brand-blue)', 
        color: 'white',
        borderRadius: 'var(--border-radius-lg)',
        overflow: 'hidden',
        marginBottom: 'var(--spacing-6)'
      }}>
        {/* Map Image explicitly exposed on the right side */}
        <div className="hidden-mobile" style={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0,
          width: '55%',
          zIndex: 0,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
          <img src="/dr_cuba_map.png" alt="Dominican Republic to Cuba" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, mixBlendMode: 'screen' }} />
          
        </div>

        {/* Gradient overlay to ensure text readability */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(90deg, rgba(9,46,92,1) 45%, rgba(9,46,92,0) 100%)',
          zIndex: 0
        }}></div>

        <div className="hero-container" style={{ position: 'relative', zIndex: 1, padding: 'var(--spacing-12) var(--spacing-8)' }}>
          <h1 className="hero-title" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: 'var(--spacing-4)', maxWidth: '500px' }}>
            Compra en República Dominicana <br />
            <span style={{ color: 'var(--color-accent)' }}>para tu familia en Cuba</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: '1.1rem', maxWidth: '450px', marginBottom: 'var(--spacing-8)', opacity: 0.9 }}>
            Nosotros compramos, consolidamos y entregamos con amor.
          </p>
          
          <div className="flex gap-4 hero-buttons">
            <Link to="/catalogo" className="btn btn-secondary" style={{ padding: 'var(--spacing-3) var(--spacing-6)', fontSize: '1rem', fontWeight: 600, display: 'inline-block', textDecoration: 'none' }}>
              Comprar ahora
            </Link>
            <Link to="/mayorista-mipymes" className="btn btn-gold-hover" style={{ padding: 'var(--spacing-3) var(--spacing-6)', fontSize: '1rem', fontWeight: 600, border: '1px solid white', backgroundColor: 'transparent', color: 'white', textDecoration: 'none', display: 'inline-block' }}>
              Compra Mayorista
            </Link>
          </div>
        </div>

        {/* Enormous Transparent Watermark Logo Behind the Letters */}
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '45%', zIndex: 0, opacity: 0.1, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10%' }}>
          <img src="/logo.png" alt="" style={{ width: '100%', objectFit: 'contain', filter: 'invert(1)', mixBlendMode: 'screen' }} />
        </div>
      </section>

      {/* Trust Bar */}
      <section style={{ backgroundColor: '#0b2e59', color: 'white', borderRadius: 'var(--border-radius-md)', padding: 'var(--spacing-4) var(--spacing-8)', marginBottom: 'var(--spacing-8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
        <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
          <ShieldCheck size={20} opacity={0.8} /> Envíos seguros
        </div>
        <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
          <Truck size={20} opacity={0.8} /> Entrega confiable
        </div>
        <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
          <Clock size={20} opacity={0.8} /> Soporte 24/7
        </div>
        <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
          <Lock size={20} opacity={0.8} /> Pagos seguros
        </div>
      </section>

      {/* Explora por Categorías */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-4)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Explora por categorías</h2>
          <Link to="/catalogo" style={{ fontSize: '0.875rem', color: 'var(--color-brand-blue)', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
            Ver todas <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 categories-grid-mobile">
          {catalogCats.map(cat => (
            <Link key={cat.id} to={`/catalogo?cat=${cat.id}`} className="flex flex-col items-center gap-2 category-item-mobile" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="category-img-container" style={{ padding: '4px', border: '1px solid var(--color-border)', width: '100%', aspectRatio: '1/1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s', cursor: 'pointer', overflow: 'hidden' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, textAlign: 'center', color: 'var(--color-primary)' }}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginBottom: 'var(--spacing-8)' }}>
        <div style={{ backgroundColor: 'var(--color-brand-blue)', color: 'white', padding: 'var(--spacing-4)', borderRadius: 'var(--border-radius)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
          <div style={{ backgroundColor: 'white', color: 'var(--color-brand-blue)', padding: '5px', borderRadius: '4px', fontWeight: 800 }}>/</div>
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.9rem' }}>¿No encuentras algo?</h4>
            <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>Haz tu encargo personalizado</p>
          </div>
        </div>
        <div style={{ backgroundColor: '#1e3050', color: 'white', padding: 'var(--spacing-4)', borderRadius: 'var(--border-radius)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
           <Truck size={24} color="#4ade80" />
           <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.9rem' }}>Entregas desde 7 días</h4>
            <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>según la provincia</p>
          </div>
        </div>
        <div style={{ backgroundColor: '#064e3b', color: 'white', padding: 'var(--spacing-4)', borderRadius: 'var(--border-radius)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
           <MessageCircle size={24} color="#4ade80" />
           <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.9rem' }}>Atención por WhatsApp</h4>
            <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>Escríbenos ahora</p>
          </div>
        </div>
      </div>

      <div style={{ paddingBottom: 'var(--spacing-8)' }}></div>
    </div>
  );
};

export default Home;
