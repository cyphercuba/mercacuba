import React, { useState } from 'react';
import { Crown, Zap, Clock, Check, Star, Shield, Gift, Bell } from 'lucide-react';

const Membresias = () => {
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const plans = [
    {
      id: 'medium',
      name: 'Member',
      badge: 'ACCESO ANTICIPADO',
      price: '$25',
      period: '/año',
      color: '#16437d',
      gradient: 'linear-gradient(135deg, #16437d 0%, #092e5c 100%)',
      glowColor: 'rgba(22, 67, 125, 0.3)',
      icon: <Clock size={32} color="white" />,
      tagline: 'Antes que el público general',
      highlight: '24 horas antes',
      highlightDetail: 'de acceso a las ofertas',
      features: [
        { icon: <Bell size={16} />, text: 'Alertas 24 h antes que el público' },
        { icon: <Gift size={16} />, text: 'Descuentos exclusivos para miembros' },
        { icon: <Shield size={16} />, text: 'Soporte prioritario por WhatsApp' },
        { icon: <Check size={16} />, text: 'Acceso a combos especiales' },
        { icon: <Check size={16} />, text: 'Newsletter semanal de ofertas' },
      ],
      cta: 'Obtener Membresía Member',
      ctaColor: '#16437d',
    },
    {
      id: 'elite',
      name: 'Elite',
      badge: '⚡ MÁS POPULAR',
      price: '$50',
      period: '/año',
      color: '#d4af37',
      gradient: 'linear-gradient(135deg, #c9991a 0%, #d4af37 50%, #f0d060 100%)',
      glowColor: 'rgba(212, 175, 55, 0.4)',
      icon: <Crown size={32} color="#092e5c" />,
      tagline: 'El primero en verlo todo',
      highlight: 'Acceso instantáneo',
      highlightDetail: 'antes que todos los demás',
      features: [
        { icon: <Zap size={16} />, text: 'Acceso instantáneo a TODAS las ofertas' },
        { icon: <Crown size={16} />, text: 'Ofertas exclusivas solo para Elite' },
        { icon: <Star size={16} />, text: 'Gestor personal de pedidos' },
        { icon: <Shield size={16} />, text: 'Soporte VIP 24/7 prioritario' },
        { icon: <Gift size={16} />, text: 'Descuentos adicionales del 10% en combos' },
        { icon: <Bell size={16} />, text: 'Alertas push en tiempo real' },
        { icon: <Check size={16} />, text: 'Acceso a preventas y lanzamientos' },
      ],
      cta: 'Obtener Membresía Elite',
      ctaColor: '#d4af37',
      isPopular: true,
    },
  ];

  return (
    <section className="membresias-section">
      {/* Header */}
      <div className="membresias-header">
        <div className="membresias-badge-pill">
          <Crown size={14} />
          <span>PROGRAMA DE MEMBRESÍAS</span>
        </div>
        <h2 className="membresias-title">
          Sé el Primero en las
          <span className="membresias-title-accent"> Mejores Ofertas</span>
        </h2>
        <p className="membresias-subtitle">
          Únete a nuestra comunidad de compradores VIP y accede a precios irrepetibles
          antes que nadie. Pago anual, beneficios todo el año.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="membresias-grid">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`membresia-card ${plan.isPopular ? 'membresia-card--elite' : 'membresia-card--medium'} ${hoveredPlan === plan.id ? 'membresia-card--hovered' : ''}`}
            onMouseEnter={() => setHoveredPlan(plan.id)}
            onMouseLeave={() => setHoveredPlan(null)}
          >
            {/* Popular Badge */}
            {plan.isPopular && (
              <div className="membresia-popular-badge">⚡ MÁS POPULAR</div>
            )}

            {/* Card Top */}
            <div
              className="membresia-card-top"
              style={{ background: plan.gradient }}
            >
              <div className="membresia-icon-wrapper">
                {plan.icon}
              </div>
              <h3 className="membresia-name" style={{ color: plan.isPopular ? '#092e5c' : 'white' }}>
                {plan.name}
              </h3>
              <p className="membresia-tagline" style={{ color: plan.isPopular ? 'rgba(9,46,92,0.8)' : 'rgba(255,255,255,0.85)' }}>
                {plan.tagline}
              </p>

              {/* Price */}
              <div className="membresia-price-block">
                <span className="membresia-price" style={{ color: plan.isPopular ? '#092e5c' : 'white' }}>
                  {plan.price}
                </span>
                <span className="membresia-period" style={{ color: plan.isPopular ? 'rgba(9,46,92,0.7)' : 'rgba(255,255,255,0.7)' }}>
                  {plan.period}
                </span>
              </div>

              {/* Highlight */}
              <div className="membresia-highlight" style={{ background: plan.isPopular ? 'rgba(9,46,92,0.15)' : 'rgba(255,255,255,0.15)' }}>
                <span className="membresia-highlight-time" style={{ color: plan.isPopular ? '#092e5c' : 'white' }}>
                  {plan.highlight}
                </span>
                <span className="membresia-highlight-detail" style={{ color: plan.isPopular ? 'rgba(9,46,92,0.75)' : 'rgba(255,255,255,0.8)' }}>
                  {plan.highlightDetail}
                </span>
              </div>
            </div>

            {/* Features List */}
            <div className="membresia-features">
              <p className="membresia-features-title">Incluye:</p>
              <ul className="membresia-features-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="membresia-feature-item">
                    <span className="membresia-feature-icon" style={{ color: plan.isPopular ? '#d4af37' : '#16437d' }}>
                      {feature.icon}
                    </span>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="membresia-cta">
              <button
                className={`membresia-btn ${plan.isPopular ? 'membresia-btn--elite' : 'membresia-btn--medium'}`}
              >
                {plan.cta}
              </button>
              <p className="membresia-cta-note">
                ✓ Renovación automática anual · Cancela cuando quieras
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Note */}
      <div className="membresias-comparison">
        <div className="membresias-comparison-inner">
          <div className="membresias-comparison-item">
            <span className="membresias-comparison-icon">👤</span>
            <div>
              <strong>Sin membresía</strong>
              <p>Acceso al catálogo general sin prioridad</p>
            </div>
          </div>
          <div className="membresias-comparison-arrow">→</div>
          <div className="membresias-comparison-item">
            <span className="membresias-comparison-icon">🔵</span>
            <div>
              <strong>Member</strong>
              <p>Ver ofertas <em>24 h antes</em> que el público</p>
            </div>
          </div>
          <div className="membresias-comparison-arrow">→</div>
          <div className="membresias-comparison-item membresias-comparison-item--elite">
            <span className="membresias-comparison-icon">⚡</span>
            <div>
              <strong>Elite</strong>
              <p>Ver ofertas <em>al instante</em>, antes que todos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membresias;
