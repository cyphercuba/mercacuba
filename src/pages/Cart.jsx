import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { state, updateQuantity, removeFromCart } = useCart();
  const feeServicio = 0; 
  const totalFinal = state.total + feeServicio;

  if (state.items.length === 0) {
    return (
      <div className="container" style={{ padding: 'var(--spacing-12) var(--spacing-4)', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <ShoppingCart size={64} style={{ color: 'var(--color-text-muted)', opacity: 0.5, marginBottom: 'var(--spacing-4)' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: 'var(--spacing-2)' }}>Tu carrito está vacío</h2>
        <p className="text-muted" style={{ marginBottom: 'var(--spacing-6)' }}>Parece que aún no has agregado productos a tu compra.</p>
        <Link to="/catalogo" className="btn btn-primary">Ir al Catálogo</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: 'var(--spacing-8) var(--spacing-4)', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 'var(--spacing-4)' }}>Tu Carrito</h1>
      
      {/* Free Shipping Banner */}
      <div style={{ backgroundColor: '#10b981', padding: '1.25rem', borderRadius: '20px', marginBottom: '2rem', boxShadow: '0 8px 20px -8px rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', gap: '1rem', color: 'white' }}>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.6rem', borderRadius: '12px' }}>
          <Truck size={24} />
        </div>
        <div>
          <h4 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '2px' }}>¡Envío GRATIS activado! 🚀</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>Estamos en promoción: envío sin costo para todo el país por tiempo limitado.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8" style={{ display: 'flex', flexDirection: 'row', gap: 'var(--spacing-8)' }}>
        
        {/* Lista de Productos */}
        <div style={{ flex: 2 }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: 'var(--color-border)', overflow: 'hidden' }}>
            {state.items.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: 'var(--spacing-4)', padding: 'var(--spacing-4)', backgroundColor: 'var(--color-surface)', alignItems: 'center' }}>
                <div style={{ width: '90px', height: '90px', borderRadius: '12px', backgroundColor: '#f8fafc', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={item.image || '/logo.png'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: item.image ? 1 : 0.2 }} />
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0b2e59', marginBottom: '0.25rem' }}>{item.name}</h3>
                  <p style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem' }}>${item.price.toFixed(2)}</p>
                </div>

                {/* Controles de Cantidad */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f5f9', borderRadius: '12px', padding: '0.25rem' }}>
                    <button 
                      style={{ padding: '0.5rem', color: '#0b2e59', background: 'none', border: 'none', cursor: 'pointer' }}
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      <Minus size={16} />
                    </button>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                    <button 
                      style={{ padding: '0.5rem', color: '#0b2e59', background: 'none', border: 'none', cursor: 'pointer' }}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button 
                    style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen de Compra */}
        <div style={{ flex: 1 }}>
          <div className="card" style={{ padding: '2rem', position: 'sticky', top: 'var(--spacing-24)', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0b2e59', marginBottom: '1.5rem' }}>
              Resumen del Pedido
            </h3>
            
            <div className="flex justify-between" style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b', fontWeight: 600 }}>Subtotal</span>
              <span style={{ fontWeight: 700 }}>${state.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b', fontWeight: 600 }}>Costo de Envío</span>
              <span style={{ fontWeight: 700, color: isFreeShipping ? '#10b981' : '#0f172a' }}>
                {isFreeShipping ? 'GRATIS' : `$${feeServicio.toFixed(2)}`}
              </span>
            </div>
            
            <div style={{ borderTop: '2px dashed #e2e8f0', paddingTop: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0b2e59' }}>TOTAL</span>
              <span style={{ fontWeight: 900, fontSize: '1.5rem', color: 'var(--color-brand-blue)' }}>${totalFinal.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="btn" style={{ width: '100%', justifyContent: 'center', backgroundColor: '#0b2e59', color: 'white', padding: '1rem', borderRadius: '14px', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Pagar Orden
              <ArrowRight size={20} />
            </Link>
            
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', marginTop: '1.5rem', lineHeight: '1.4' }}>
              Impuestos incluidos. Pago contra entrega o transferencia coordinada por WhatsApp.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
