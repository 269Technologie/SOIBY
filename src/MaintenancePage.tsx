import { AlertTriangle, Clock } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(to bottom right, #EFF6FF, #E0E7FF)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      margin: 0,
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '768px', width: '100%' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          padding: '48px'
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <img 
              src="/SOIBY_LOGO_web.png"
              alt="SOIBY Logo" 
              style={{
                margin: '0 auto',
                height: '100px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'block';
              }}
            />
            <h1 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#1F2937',
              marginTop: '16px',
              display: 'none'
            }}>
              SOIBY
            </h1>
          </div>

          {/* Main Message */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <AlertTriangle style={{ width: '24px', height: '24px', color: '#F59E0B' }} />
              <h2 style={{
                fontSize: '28px',
                fontWeight: '600',
                color: '#374151',
                margin: 0
              }}>
                Maintenance en cours
              </h2>
            </div>
            
            <p style={{
              color: '#4B5563',
              fontSize: '18px',
              lineHeight: '1.75',
              margin: 0
            }}>
              Notre site web fait actuellement l'objet d'une intervention technique 
              suite à un incident de sécurité.
            </p>
          </div>

          {/* Info Box */}
          <div style={{
            backgroundColor: '#EFF6FF',
            borderLeft: '4px solid #3B82F6',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'start',
            gap: '12px'
          }}>
            <Clock style={{
              width: '20px',
              height: '20px',
              color: '#2563EB',
              marginTop: '4px',
              flexShrink: 0
            }} />
            <div>
              <h3 style={{
                fontWeight: '600',
                color: '#1E3A8A',
                marginBottom: '8px',
                marginTop: 0
              }}>
                Que se passe-t-il ?
              </h3>
              <p style={{
                color: '#1E40AF',
                fontSize: '14px',
                lineHeight: '1.5',
                margin: 0
              }}>
                Nos équipes travaillent activement pour résoudre ce problème et 
                sécuriser votre expérience. Nous mettons tout en œuvre pour rétablir 
                le service dans les plus brefs délais.
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div style={{ textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>
            <p style={{ marginBottom: '8px' }}>
              Nous nous excusons pour la gêne occasionnée.
            </p>
            <p style={{ margin: 0 }}>
              Pour toute urgence, veuillez nous contacter à{' '}
              <a 
                href="+33 1 89 70 66 49" 
                style={{
                  color: '#3B82F6',
                  textDecoration: 'underline'
                }}
              >
                +33 1 89 70 66 49
              </a>
            </p>
          </div>

          {/* Loading Animation */}
          <div style={{
            marginTop: '32px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{
                width: '12px',
                height: '12px',
                backgroundColor: '#3B82F6',
                borderRadius: '50%',
                animation: 'bounce 1s infinite'
              }}></div>
              <div style={{
                width: '12px',
                height: '12px',
                backgroundColor: '#F59E0B',
                borderRadius: '50%',
                animation: 'bounce 1s infinite 0.15s'
              }}></div>
              <div style={{
                width: '12px',
                height: '12px',
                backgroundColor: '#F59E0B',
                borderRadius: '50%',
                animation: 'bounce 1s infinite 0.3s'
              }}></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          color: '#6B7280',
          fontSize: '14px'
        }}>
          © 2024 SOIBY - Tous droits réservés
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}