import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Info } from 'lucide-react';

const Checkout = () => {
  const { state, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombreRemitente: '',
    nombreDestinatario: '',
    provincia: 'La Habana',
    municipio: '',
    telefonoCuba: '',
    notas: ''
  });

  const provincias = ['La Habana', 'Matanzas', 'Villa Clara', 'Santiago de Cuba']; // Ejemplo
  const feeServicio = state.total > 0 ? 5.00 : 0;
  const totalFinal = state.total + feeServicio;

  if (state.items.length === 0) {
    return (
      <div className="container" style={{ padding: 'var(--spacing-12) 0', textAlign: 'center' }}>
        <h2>No hay productos para procesar.</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 'var(--spacing-4)' }}>Volver al Inicio</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    
    // Formatear el pedido para WhatsApp
    let mensaje = `*NUEVO PEDIDO - MERCADOCUBA RD* 🛒\n\n`;
    mensaje += `*DATOS DEL REMITENTE*\n`;
    mensaje += `Nombre: ${formData.nombreRemitente}\n\n`;
    
    mensaje += `*DATOS DE ENTREGA EN CUBA*\n`;
    mensaje += `Recibe: ${formData.nombreDestinatario}\n`;
    mensaje += `Teléfono: ${formData.telefonoCuba}\n`;
    mensaje += `Provincia: ${formData.provincia}\n`;
    mensaje += `Municipio/Dirección: ${formData.municipio}\n`;
    if (formData.notas) mensaje += `Notas: ${formData.notas}\n`;
    
    mensaje += `\n*PRODUCTOS*\n`;
    state.items.forEach(item => {
      mensaje += `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})\n`;
    });
    
    mensaje += `\n*TOTAL A PAGAR*\n`;
    mensaje += `Subtotal: $${state.total.toFixed(2)}\n`;
    mensaje += `Envío/Fee: $${feeServicio.toFixed(2)}\n`;
    mensaje += `*TOTAL FINAL: $${totalFinal.toFixed(2)}*\n\n`;
    
    mensaje += `Por favor, confírmenme las opciones de pago (Zelle, Cash App, Bizum, o transferencia en RD).`;

    const numeroWhatsApp = '15551234567'; // Reemplazar en config real
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    
    // Opcional: clearCart(); navigate('/gracias'); 
    // Para la fase 1, solo redirigimos a WhatsApp en nueva pestaña
    window.open(url, '_blank');
  };

  return (
    <div className="container" style={{ padding: 'var(--spacing-8) var(--spacing-4)', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 'var(--spacing-2)' }}>Checkout Seguro</h1>
      <p className="text-muted" style={{ marginBottom: 'var(--spacing-8)' }}>Paso final. Completa los datos de envío y procesaremos tu orden vía WhatsApp.</p>

      <div className="card" style={{ padding: 'var(--spacing-6)' }}>
        <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
          
          <div style={{ padding: 'var(--spacing-4)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius)', display: 'flex', gap: 'var(--spacing-2)', alignItems: 'center' }}>
            <Info color="var(--color-primary)" />
            <span style={{ fontSize: '0.875rem' }}>No te cobraremos aquí. Al enviar el formulario se abrirá WhatsApp con el resumen de tu pedido y las instrucciones de pago.</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--spacing-4)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-2)' }}>1. Quien Envía</h3>
            <div>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontSize: '0.875rem', fontWeight: 500 }}>Tu Nombre (Remitente) *</label>
              <input type="text" name="nombreRemitente" required value={formData.nombreRemitente} onChange={handleChange} style={{ width: '100%', padding: 'var(--spacing-2)', borderRadius: 'var(--border-radius)', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="Tu nombre..." />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--spacing-4)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-2)', marginTop: 'var(--spacing-4)' }}>2. Quien Recibe en Cuba</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontSize: '0.875rem', fontWeight: 500 }}>Nombre del Destinatario *</label>
                <input type="text" name="nombreDestinatario" required value={formData.nombreDestinatario} onChange={handleChange} style={{ width: '100%', padding: 'var(--spacing-2)', borderRadius: 'var(--border-radius)', border: '1px solid var(--color-border)', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontSize: '0.875rem', fontWeight: 500 }}>Teléfono en Cuba (Móvil o Fijo) *</label>
                <input type="text" name="telefonoCuba" required value={formData.telefonoCuba} onChange={handleChange} style={{ width: '100%', padding: 'var(--spacing-2)', borderRadius: 'var(--border-radius)', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="+53..." />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontSize: '0.875rem', fontWeight: 500 }}>Provincia *</label>
                <select name="provincia" value={formData.provincia} onChange={handleChange} style={{ width: '100%', padding: 'var(--spacing-2)', borderRadius: 'var(--border-radius)', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'white' }}>
                  {provincias.map(prov => <option key={prov} value={prov}>{prov}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontSize: '0.875rem', fontWeight: 500 }}>Municipio y Dirección Exacta *</label>
                <input type="text" name="municipio" required value={formData.municipio} onChange={handleChange} style={{ width: '100%', padding: 'var(--spacing-2)', borderRadius: 'var(--border-radius)', border: '1px solid var(--color-border)', outline: 'none' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontSize: '0.875rem', fontWeight: 500 }}>Notas Adicionales (Opcional)</label>
              <textarea name="notas" value={formData.notas} onChange={handleChange} rows="3" style={{ width: '100%', padding: 'var(--spacing-2)', borderRadius: 'var(--border-radius)', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="Alguna referencia de la casa, horario preferido de entrega..."></textarea>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--color-background)', padding: 'var(--spacing-4)', borderRadius: 'var(--border-radius)', marginTop: 'var(--spacing-4)' }}>
            <div className="flex justify-between" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 'var(--spacing-4)' }}>
              <span>Total a Pagar:</span>
              <span className="text-secondary">${totalFinal.toFixed(2)} USD</span>
            </div>
            
            <button type="submit" className="btn btn-secondary w-full" style={{ width: '100%', justifyContent: 'center', fontSize: '1.125rem', padding: 'var(--spacing-3)' }}>
              <CheckCircle size={24} />
              Enviar Pedido por WhatsApp
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Checkout;
