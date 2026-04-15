import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { Search, Filter } from 'lucide-react';

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('cat') || 'all';
  const queryParam = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(queryParam);
  
  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);
  
  const { addToCart } = useCart();

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.categoryId === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container" style={{ padding: 'var(--spacing-8) var(--spacing-4)' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 'var(--spacing-6)' }}>
        Catálogo de Productos
      </h1>
      
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4" style={{ marginBottom: 'var(--spacing-8)', display: 'flex', flexDirection: 'column' }}>
        
        {/* Search Bar */}
        <div style={{ display: 'flex', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--border-radius)', padding: 'var(--spacing-2) var(--spacing-4)', alignItems: 'center', border: '1px solid var(--color-border)', flex: 1 }}>
          <input 
            type="text" 
            placeholder="Buscar por nombre, descripción..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              const newParams = new URLSearchParams(searchParams);
              if (e.target.value.trim()) newParams.set('q', e.target.value);
              else newParams.delete('q');
              setSearchParams(newParams);
            }}
            style={{ border: 'none', outline: 'none', width: '100%', color: 'var(--color-text-main)' }}
          />
          <Search color="var(--color-text-muted)" size={20} />
        </div>

        {/* Categories Pills Removed based on feedback */}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="card flex flex-col" style={{ padding: 'var(--spacing-4)', alignItems: 'center', textAlign: 'center', backgroundColor: 'white', borderRadius: 'var(--border-radius)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid var(--color-border)' }}>
              <div style={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--spacing-4)' }}>
                <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 'var(--spacing-2)', textTransform: 'uppercase' }}>{product.name}</h3>
              <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                {product.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: 'var(--spacing-12) 0', color: 'var(--color-text-muted)' }}>
          <Filter size={48} style={{ margin: '0 auto var(--spacing-4)', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 500 }}>No se encontraron productos</h3>
          <p>Prueba con otros términos de búsqueda o elimina los filtros.</p>
          <button 
            className="btn btn-outline" 
            style={{ marginTop: 'var(--spacing-4)' }}
            onClick={() => { setSearchQuery(''); setSearchParams({}); }}
          >
            Limpiar Filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalog;
