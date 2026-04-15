import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { state, updateQuantity, removeFromCart } = useCart();
  const feeServicio = state.total > 0 ? 5.00 : 0; // Ejemplo de fee fijo
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
      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 'var(--spacing-6)' }}>Tu Carrito</h1>
      
      <div className="flex flex-col md:flex-row gap-8" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        
        {/* Lista de Productos */}
        <div style={{ flex: 2 }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: 'var(--color-border)' }}>
            {state.items.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: 'var(--spacing-4)', padding: 'var(--spacing-4)', backgroundColor: 'var(--color-surface)', alignItems: 'center' }}>
                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--border-radius)' }} />
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{item.name}</h3>
                  <p className="text-primary" style={{ fontWeight: 700 }}>${item.price.toFixed(2)}</p>
                </div>

                {/* Controles de Cantidad */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-full)' }}>
                    <button 
                      style={{ padding: 'var(--spacing-2)', color: 'var(--color-text-muted)' }}
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      <Minus size={16} />
                    </button>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
                    <button 
                      style={{ padding: 'var(--spacing-2)', color: 'var(--color-text-main)' }}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button 
                    style={{ color: 'var(--color-danger)', padding: 'var(--spacing-2)' }}
                    onClick={() => removeFromCart(item.id)}
                    title="Eliminar producto"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen de Compra */}
        <div style={{ flex: 1 }}>
          <div className="card" style={{ padding: 'var(--spacing-6)', position: 'sticky', top: 'var(--spacing-24)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--spacing-4)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-2)' }}>
              Resumen de la orden
            </h3>
            
            <div className="flex justify-between" style={{ marginBottom: 'var(--spacing-2)' }}>
              <span className="text-muted">Subtotal</span>
              <span>${state.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between" style={{ marginBottom: 'var(--spacing-4)' }}>
              <span className="text-muted">Despacho y Envío</span>
              <span>${feeServicio.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between" style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-4)', marginBottom: 'var(--spacing-6)' }}>
              <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>Total</span>
              <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-secondary)' }}>${totalFinal.toFixed(2)}</span>
            </div>

            {/* TODO: Link to Checkout */}
            <Link to="/checkout" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              Proceder al Checkout
              <ArrowRight size={20} />
            </Link>
            
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: 'var(--spacing-4)' }}>
              Impuestos incluidos. El pago se coordinará al finalizar la orden por WhatsApp de forma segura.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
