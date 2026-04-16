import React, { useState, useEffect } from 'react';
import { User, Lock, Mail, Phone, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../lib/auth';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { user, setUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Scroll to top automatically when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            password: form.password,
          };

      const result = isLogin ? await loginUser(payload) : await registerUser(payload);

      if (!result.ok) {
        setError(result.error || 'Ocurrió un error.');
      } else {
        if (isLogin) {
          if (result.user) setUser(result.user);
          setMessage('Sesión iniciada correctamente. Redirigiendo...');
          setTimeout(() => {
            if (result.user.role === 'admin') {
              navigate('/admin');
            } else {
              navigate('/');
            }
          }, 900);
        } else {
          setMessage('Cuenta creada correctamente. Redirigiendo al inicio de sesión...');
          setForm({ firstName: '', lastName: '', email: form.email, phone: '', password: '' });
          setTimeout(() => {
            setIsLogin(true);
            setMessage('Ahora inicia sesión con tu cuenta nueva.');
          }, 1400);
        }
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-portal-wrapper">
      {/* Cinematic Premium Background Layer */}
      <div className="auth-portal-bg"></div>
      <div className="auth-portal-overlay"></div>

      {/* Centered Form Area */}
      <div className="auth-portal-container">
        <div className="auth-portal-card">
          
          {/* User Icon Badge */}
          <div className="auth-portal-badge">
            <div className="auth-portal-badge-inner">
              <User size={38} />
            </div>
          </div>

          <Link to="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '6px', 
            fontSize: '0.85rem', 
            color: '#64748b', 
            textDecoration: 'none', 
            marginBottom: '1.5rem', 
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            <ChevronLeft size={16} /> Volver al Inicio
          </Link>

          <div style={{ textAlign: 'center' }}>
            <h2 className="auth-portal-title">
              {isLogin ? 'Bienvenido' : 'Únete Ahora'}
            </h2>
            <p className="auth-portal-subtitle">
              {isLogin ? 'Acceso exclusivo al mercado de lujo.' : 'La mejor experiencia de compra en Cuba.'}
            </p>
          </div>

          {!isLogin && message.startsWith('Cuenta creada correctamente') ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#166534', marginBottom: '1rem' }}>
                Cuenta creada correctamente
              </div>
              <p style={{ color: '#475569', fontSize: '1rem', marginBottom: 0 }}>
                Redirigiendo al inicio de sesión...
              </p>
            </div>
          ) : (
          <form className="auth-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="auth-name-row" style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Nombre</label>
                  <div className="auth-input-wrapper" style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 12px', transition: 'border-color 0.2s', backgroundColor: '#f8fafc' }}>
                    <User size={18} color="#94a3b8" style={{ minWidth: '18px' }} />
                    <input type="text" className="auth-input" style={{ flex: 1, minWidth: 0, padding: '12px 8px', border: 'none', background: 'transparent', outline: 'none' }} placeholder="Juan" value={form.firstName} onChange={handleChange('firstName')} />
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Apellido</label>
                  <div className="auth-input-wrapper" style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 12px', transition: 'border-color 0.2s', backgroundColor: '#f8fafc' }}>
                    <input type="text" className="auth-input" style={{ flex: 1, minWidth: 0, padding: '12px 8px', border: 'none', background: 'transparent', outline: 'none' }} placeholder="Pérez" value={form.lastName} onChange={handleChange('lastName')} />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Correo electrónico</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 12px', transition: 'border-color 0.2s', backgroundColor: '#f8fafc' }}>
                <Mail size={18} color="#94a3b8" style={{ minWidth: '18px' }} />
                <input type="email" className="auth-input" style={{ flex: 1, padding: '12px 8px', border: 'none', background: 'transparent', outline: 'none' }} placeholder="tu@email.com" value={form.email} onChange={handleChange('email')} />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Número de teléfono</label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 12px', transition: 'border-color 0.2s', backgroundColor: '#f8fafc' }}>
                  <Phone size={18} color="#94a3b8" style={{ minWidth: '18px' }} />
                  <input type="tel" className="auth-input" style={{ flex: 1, padding: '12px 8px', border: 'none', background: 'transparent', outline: 'none' }} placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange('phone')} />
                </div>
              </div>
            )}

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Contraseña</label>
                {isLogin && <a href="#" style={{ fontSize: '0.8rem', color: '#0b2e59', textDecoration: 'none', fontWeight: 600 }}>¿Olvidaste tu contraseña?</a>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 12px', transition: 'border-color 0.2s', backgroundColor: '#f8fafc' }}>
                <Lock size={18} color="#94a3b8" style={{ minWidth: '18px' }} />
                <input type="password" className="auth-input" style={{ flex: 1, padding: '12px 8px', border: 'none', background: 'transparent', outline: 'none' }} placeholder="••••••••" value={form.password} onChange={handleChange('password')} />
              </div>
            </div>

            {error && <div style={{ color: '#b91c1c', fontSize: '0.9rem', fontWeight: 600 }}>{error}</div>}
            {message && <div style={{ color: '#166534', fontSize: '0.9rem', fontWeight: 600 }}>{message}</div>}

            <button type="submit" className="auth-btn" disabled={loading} style={{ marginTop: '1rem', width: '100%', padding: '14px', backgroundColor: loading ? '#64748b' : '#0b2e59', color: 'white', borderRadius: '8px', border: 'none', fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background-color 0.2s' }} onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#16437d'; }} onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = '#0b2e59'; }}>
              {loading ? 'Procesando...' : isLogin ? 'Ingresar a mi cuenta' : 'Completar registro'}
            </button>
          </form>
          )}

          <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
              {isLogin ? '¿Aún no tienes cuenta?' : '¿Ya eres miembro?'}
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)}
                style={{ color: '#ff6f00', fontSize: '0.9rem', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', marginLeft: '8px' }}
              >
                {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
              </button>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
