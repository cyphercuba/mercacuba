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
        image: product.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&h=300&q=80',
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
      borderRadius: '16px', 
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {hasDiscount && (
        <div style={{ 
          position: 'absolute', 
          top: '12px', 
          right: '12px', 
          backgroundColor: '#ef4444', 
          color: 'white', 
          padding: '2px 8px', 
          borderRadius: '20px', 
          fontSize: '0.7rem', 
          fontWeight: 700,
          zIndex: 1
        }}>
          OFERTA
        </div>
      )}
      
      <div style={{ 
        width: '100%', 
        aspectRatio: '1/1', 
        backgroundColor: '#f8fafc', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '0.75rem',
        overflow: 'hidden'
      }}>
        <img 
          src={product.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&h=300&q=80'} 
          alt={product.name} 
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      </div>

      <div style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <span style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.2rem' }}>
          {product.category_name}
        </span>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem', lineHeight: '1.3', minHeight: '2.4rem' }}>
          {product.name}
        </h3>
        
        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0b2e59' }}>
              US${displayPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                US${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {quantity > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f1f5f9', borderRadius: '10px', padding: '0.3rem' }}>
              <button 
                onClick={handleDecrement}
                style={{ background: 'white', border: 'none', borderRadius: '6px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#0b2e59', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
              >
                <Minus size={14} />
              </button>
              <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.85rem' }}>{quantity}</span>
              <button 
                onClick={handleIncrement}
                style={{ background: '#0b2e59', border: 'none', borderRadius: '6px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
              >
                <Plus size={14} />
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
                borderRadius: '10px', 
                padding: '0.6rem', 
                fontWeight: 700, 
                fontSize: '0.8rem',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.4rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              <ShoppingCart size={16} />
              Añadir
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
