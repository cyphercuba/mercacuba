import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloating = () => {
  const phoneNumber = '18290000000'; // Placeholder number
  const message = encodeURIComponent('Hola MercadoCuba, necesito ayuda con mi pedido.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: '#25D366',
        color: 'white',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 25px rgba(37, 211, 102, 0.4)',
        zIndex: 1000,
        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: 'pointer',
        textDecoration: 'none'
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
    >
      <MessageCircle size={32} />
      <span style={{ 
        position: 'absolute', 
        right: '100%', 
        marginRight: '12px', 
        backgroundColor: 'white', 
        color: '#075E54', 
        padding: '6px 12px', 
        borderRadius: '10px', 
        fontSize: '0.85rem', 
        fontWeight: 700,
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        pointerEvents: 'none'
      }}>
        ¿Necesitas ayuda?
      </span>
    </a>
  );
};

export default WhatsAppFloating;
