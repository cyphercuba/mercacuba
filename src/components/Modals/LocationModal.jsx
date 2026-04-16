import React, { useState } from 'react';
import { MapPin, Check, X, ChevronLeft } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { cubaLocations } from '../../data/locations';

const LocationModal = () => {
  const { location, changeLocation, isLocationModalOpen, setIsLocationModalOpen } = useShop();
  const [step, setStep] = useState('province'); // 'province' or 'municipality'
  const [tempProvince, setTempProvince] = useState('');

  if (!isLocationModalOpen) return null;

  const provinces = Object.keys(cubaLocations);
  const municipalities = tempProvince ? cubaLocations[tempProvince] : [];

  const handleProvinceSelect = (province) => {
    setTempProvince(province);
    setStep('municipality');
  };

  const handleMunicipalitySelect = (municipality) => {
    changeLocation({ province: tempProvince, municipality });
    setStep('province');
    setTempProvince('');
  };

  const handleBack = () => {
    setStep('province');
    setTempProvince('');
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 2000, padding: '1.5rem'
    }}>
      <div style={{
        backgroundColor: 'white', width: '100%', maxWidth: '700px', maxHeight: '85vh',
        borderRadius: '32px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ padding: '2.5rem 2.5rem 1.5rem', textAlign: 'center', position: 'relative' }}>
          {step === 'municipality' && (
            <button 
              onClick={handleBack}
              style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: '#f1f5f9', border: 'none', padding: '0.6rem', borderRadius: '50%', cursor: 'pointer', color: '#0b2e59', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {location && (
            <button 
              onClick={() => setIsLocationModalOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: '#f1f5f9', border: 'none', padding: '0.6rem', borderRadius: '50%', cursor: 'pointer', color: '#64748b' }}
            >
              <X size={20} />
            </button>
          )}

          <div style={{ 
            backgroundColor: '#0b2e5910', color: '#0b2e59', width: '64px', height: '64px', 
            borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' 
          }}>
            <MapPin size={32} />
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0b2e59', marginBottom: '0.5rem' }}>
            {step === 'province' ? '¿A qué provincia enviamos?' : `¿En qué municipio de ${tempProvince}?`}
          </h2>
          <p style={{ color: '#64748b', fontWeight: 500, maxWidth: '400px', margin: '0 auto' }}>
            Selecciona tu ubicación exacta para garantizar la entrega de tus productos.
          </p>
        </div>

        <div style={{
          padding: '1.5rem 2.5rem 3rem', overflowY: 'auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem'
        }}>
          {step === 'province' ? (
            provinces.map((p) => (
              <button
                key={p}
                onClick={() => handleProvinceSelect(p)}
                style={{
                  padding: '1rem 1.25rem', borderRadius: '16px', border: location?.province === p ? '2px solid #0b2e59' : '1px solid #e2e8f0',
                  backgroundColor: location?.province === p ? '#f8fafc' : 'white', color: location?.province === p ? '#0b2e59' : '#475569',
                  textAlign: 'left', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {p}
              </button>
            ))
          ) : (
            municipalities.map((m) => (
              <button
                key={m}
                onClick={() => handleMunicipalitySelect(m)}
                style={{
                  padding: '1rem 1.25rem', borderRadius: '16px', border: location?.municipality === m ? '2px solid #0b2e59' : '1px solid #e2e8f0',
                  backgroundColor: location?.municipality === m ? '#f8fafc' : 'white', color: location?.municipality === m ? '#0b2e59' : '#475569',
                  textAlign: 'left', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {m}
              </button>
            ))
          )}
        </div>

        <div style={{
          padding: '1.5rem 2.5rem', backgroundColor: '#f8fafc', borderTop: '1px solid #f1f5f9',
          textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600
        }}>
          🇨🇺 Envíos directos a la puerta de tu casa
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
