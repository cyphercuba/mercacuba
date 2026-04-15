import React from 'react';
import { Tag } from 'lucide-react';

const Ofertas = () => {
  return (
    <div className="container" style={{ padding: 'var(--spacing-12) var(--spacing-4)', textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Tag size={64} color="var(--color-text-muted)" style={{ margin: '0 auto var(--spacing-6)', opacity: 0.5 }} />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 'var(--spacing-4)' }}>
        Ofertas Especiales
      </h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
        Las ofertas no están disponibles por el momento. <br/>
        Mantente atento a nuestras futuras actualizaciones para grandes descuentos.
      </p>
    </div>
  );
};

export default Ofertas;
