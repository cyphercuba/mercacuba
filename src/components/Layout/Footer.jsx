import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, Mail, Phone, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <>
      <style>{`
        @keyframes whatsappPulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.55); }
          50% { transform: scale(1.03); box-shadow: 0 0 0 10px rgba(37, 211, 102, 0.12); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
      `}</style>
      <footer style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', padding: 'var(--spacing-12) 0 var(--spacing-6) 0', marginTop: 'auto' }}>
      <div className="container grid grid-cols-4 gap-8" style={{ marginBottom: 'var(--spacing-8)' }}>
        
        {/* Brand */}
        <div className="flex-col gap-4">
          <Link to="/" className="flex items-center gap-2" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 'var(--spacing-4)' }}>
            <span style={{ color: 'var(--color-brand-blue)' }}>MercaCuba</span>
            <span style={{ color: 'var(--color-accent)' }}>RD</span>
          </Link>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: 'var(--spacing-4)' }}>
            Acercando familias. Compras seguras desde RD, USA o Europa para tus seres queridos en Cuba.
          </p>
          <div className="flex gap-4">
            <Share2 color="var(--color-primary)" size={20} />
            <Mail color="var(--color-primary)" size={20} />
            <Phone color="var(--color-primary)" size={20} />
          </div>
        </div>

        {/* Links: Compra */}
        <div>
          <h4 style={{ color: 'var(--color-primary)', fontWeight: 600, marginBottom: 'var(--spacing-4)' }}>Compra</h4>
          <ul className="flex-col gap-2" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            <li><Link to="/catalogo">Catálogo Completo</Link></li>
            <li><Link to="/combos">Combos Listos</Link></li>
            <li><Link to="/encargos">Compra por Encargo</Link></li>
            <li><Link to="/ofertas">Ofertas Especiales</Link></li>
          </ul>
        </div>

        {/* Links: Ayuda */}
        <div>
          <h4 style={{ color: 'var(--color-primary)', fontWeight: 600, marginBottom: 'var(--spacing-4)' }}>Ayuda</h4>
          <ul className="flex-col gap-2" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            <li><Link to="/seguimiento">Seguimiento de Pedido</Link></li>
            <li><Link to="/faq">Preguntas Frecuentes</Link></li>
            <li><Link to="/tiempos">Tiempos de Entrega</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        {/* Contact/WhatsApp */}
        <div>
          <h4 style={{ color: 'var(--color-primary)', fontWeight: 600, marginBottom: 'var(--spacing-4)' }}>¿Necesitas ayuda online?</h4>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: 'var(--spacing-4)' }}>
            Nuestro equipo de soporte estará disponible por WhatsApp de 8 AM a 8 PM.
          </p>
          <button className="btn" style={{ width: '100%', backgroundColor: '#25D366', color: 'white', border: 'none', animation: 'whatsappPulse 1.2s infinite', fontWeight: 700 }}>
            <MessageCircle size={18} />
            Soporte WhatsApp
          </button>
        </div>
      </div>

      <div className="container" style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-6)', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
        <p>&copy; {new Date().getFullYear()} MercaCuba RD. Todos los derechos reservados.</p>
      </div>
      </footer>
    </>
  );
};

export default Footer;
