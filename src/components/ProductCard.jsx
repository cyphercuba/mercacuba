import React from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  if (!product) return null;
  
  const { state: cartState, addToCart, updateQuantity } = useCart();
  const cart = cartState?.items || [];
  
  const cartItem = cart.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.id && product.price) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.sale_price || product.price,
        image: product.image_url,
        quantity: 1
      });
    }
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.id) updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.id && quantity > 0) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const rawPrice = typeof product.price === 'number' ? product.price : 0;
  const rawSalePrice = typeof product.sale_price === 'number' ? product.sale_price : null;
  const displayPrice = rawSalePrice || rawPrice;
  const hasDiscount = rawSalePrice !== null && rawSalePrice < rawPrice;

  return (
    <div className="product-card" style={{ 
      backgroundColor: 'white', 
      border: '1px solid #e2e8f0', 
      borderRadius: '24px', 
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)'
    }}>
      {hasDiscount && (
        <div style={{ 
          position: 'absolute', 
          top: '12px', 
          left: '12px', 
          backgroundColor: '#ef4444', 
          color: 'white', 
          padding: '4px 10px', 
          borderRadius: '10px', 
          fontSize: '0.7rem', 
          fontWeight: 800,
          zIndex: 1,
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
        }}>
          -{Math.round((1 - rawSalePrice/rawPrice) * 100)}%
        </div>
      )}
      
      <div style={{ 
        width: '100%', 
        aspectRatio: '1/1', 
        backgroundColor: '#f8fafc', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '1.5rem',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <img 
          src={product.image_url || '/logo.png'} 
          alt={product.name} 
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', opacity: product.image_url ? 1 : 0.2, transform: 'scale(1.05)' }}
        />
      </div>

      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>
            {product.category_name}
          </span>
          {product.stock > 0 && product.stock < 10 && (
            <span style={{ fontSize: '0.65rem', color: '#e11d48', fontWeight: 800 }}>
              Casi agotado
            </span>
          )}
        </div>

        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0b2e59', marginBottom: '0.75rem', lineHeight: '1.4', minHeight: '2.8rem' }}>
          {product.name}
        </h3>
        
        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>
              US${displayPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                US${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {quantity > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f1f5f9', borderRadius: '16px', padding: '0.4rem' }}>
              <button 
                onClick={handleDecrement}
                style={{ background: 'white', border: 'none', borderRadius: '12px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#0b2e59', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
              >
                <Minus size={16} />
              </button>
              <span style={{ fontWeight: 800, color: '#0b2e59', fontSize: '1rem' }}>{quantity}</span>
              <button 
                onClick={handleIncrement}
                style={{ background: '#0b2e59', border: 'none', borderRadius: '12px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', boxShadow: '0 4px 12px rgba(11, 46, 89, 0.2)' }}
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleAdd}
              className="btn-add-to-cart"
              style={{ 
                width: '100%', 
                backgroundColor: '#0b2e59', 
                color: 'white', 
                border: 'none', 
                borderRadius: '16px', 
                padding: '0.85rem', 
                fontWeight: 800, 
                fontSize: '0.9rem',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.6rem',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <ShoppingCart size={18} />
              Añadir
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
