import React from 'react';
import { ShoppingBag, Box, Ship, MapPin } from 'lucide-react';

const ComoFunciona = () => {
  return (
    <div className="container" style={{ padding: 'var(--spacing-8) var(--spacing-4)', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-brand-blue)', marginBottom: 'var(--spacing-2)', textAlign: 'center' }}>
          ¿Cómo Funciona MercaCuba RD?
        </h1>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-12)' }}>
          Te explicamos el proceso de envío de mercancía desde la República Dominicana a Cuba.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
          
          <div className="card" style={{ display: 'flex', gap: 'var(--spacing-6)', padding: 'var(--spacing-6)', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-4)', borderRadius: '50%', minWidth: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag size={40} color="var(--color-brand-blue)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--spacing-2)' }}>1. Haz tu selección o encargo</h3>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>Visita nuestro catálogo con cientos de opciones o contáctanos para un encargo personalizado. Puedes pedir cualquier cosa: comida, motos, electrodomésticos, ¡lo que necesites!</p>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', gap: 'var(--spacing-6)', padding: 'var(--spacing-6)', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-4)', borderRadius: '50%', minWidth: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box size={40} color="var(--color-brand-blue)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--spacing-2)' }}>2. Compramos y Consolidamos en RD</h3>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>Nuestro equipo en la República Dominicana se encarga de comprar, verificar la calidad y empaquetar de manera segura todos tus productos para su viaje.</p>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', gap: 'var(--spacing-6)', padding: 'var(--spacing-6)', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-4)', borderRadius: '50%', minWidth: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ship size={40} color="var(--color-brand-blue)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--spacing-2)' }}>3. Envío por Barco o Avión</h3>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>Dependiendo del peso y la urgencia, despachamos tus paquetes por vía aérea (más rápido) o marítima (ideal para cargas grandes y pesadas).</p>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', gap: 'var(--spacing-6)', padding: 'var(--spacing-6)', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-4)', borderRadius: '50%', minWidth: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MapPin size={40} color="var(--color-brand-blue)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--spacing-2)' }}>4. Entrega en Cuba</h3>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>Gestionamos la logística interna para garantizar que el pedido llegue directamente a las manos de tu familiar en Cuba, de forma segura y transparente.</p>
            </div>
          </div>

        </div>
    </div>
  );
};

export default ComoFunciona;
