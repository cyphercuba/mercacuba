import React from 'react';
import { Package, Plane, Ship } from 'lucide-react';

const Encargos = () => {
  return (
    <div className="container" style={{ padding: 'var(--spacing-8) var(--spacing-4)', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-brand-blue)', marginBottom: 'var(--spacing-6)', textAlign: 'center' }}>
        Encargos Especiales a Cuba
      </h1>
      
      <div className="card" style={{ padding: 'var(--spacing-8)', textAlign: 'center', backgroundColor: 'white', borderRadius: 'var(--border-radius-lg)' }}>
        <p style={{ fontSize: '1.2rem', lineHeight: 1.6, marginBottom: 'var(--spacing-6)', color: 'var(--color-text-main)' }}>
          Aceptamos encargos personalizados para enviar desde la <strong>República Dominicana a Cuba</strong>. <br/>
          Sin importar el tamaño o la cantidad, nos encargamos de que llegue a su destino.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: 'var(--spacing-8)' }}>
          <div style={{ padding: 'var(--spacing-4)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--border-radius)', border: '1px solid var(--color-border)' }}>
            <Plane size={48} color="var(--color-brand-blue)" style={{ margin: '0 auto var(--spacing-4)' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 'var(--spacing-2)' }}>Envíos Aéreos</h3>
            <p className="text-muted">Rápidos y seguros, ideales para documentos, medicinas y paquetería ligera.</p>
          </div>
          <div style={{ padding: 'var(--spacing-4)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--border-radius)', border: '1px solid var(--color-border)' }}>
            <Ship size={48} color="var(--color-brand-blue)" style={{ margin: '0 auto var(--spacing-4)' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 'var(--spacing-2)' }}>Envíos Marítimos</h3>
            <p className="text-muted">Perfectos para carga pesada, electrodomésticos, motos y cajas mayoristas.</p>
          </div>
        </div>

        <div style={{ textAlign: 'left', backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-6)', borderRadius: 'var(--border-radius)' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 'var(--spacing-2)' }}>¿Qué enviamos? ¡Enviamos de todo! Por ejemplo:</h4>
          <ul style={{ listStyleType: 'disc', paddingLeft: 'var(--spacing-6)', color: 'var(--color-text-muted)' }}>
            <li style={{ marginBottom: 'var(--spacing-2)' }}>Electrodomésticos (Neveras, Splits, Televisores)</li>
            <li style={{ marginBottom: 'var(--spacing-2)' }}>Vehículos (Motos Eléctricas y de Gasolina, Triciclos)</li>
            <li style={{ marginBottom: 'var(--spacing-2)' }}>Plantas Eléctricas de cualquier capacidad</li>
            <li style={{ marginBottom: 'var(--spacing-2)' }}>Cajas de alimentos al por mayor (Pollo, Cerdo, Arroz)</li>
            <li style={{ marginBottom: 'var(--spacing-2)' }}>Materiales de construcción y ferretería</li>
          </ul>
        </div>
        
        <button className="btn btn-secondary" style={{ marginTop: 'var(--spacing-8)', fontSize: '1.1rem', padding: 'var(--spacing-3) var(--spacing-8)' }}>
          <Package size={20} style={{ display: 'inline', marginRight: '8px' }} />
          Solicitar una Cotización de Encargo
        </button>
      </div>
    </div>
  );
};

export default Encargos;
