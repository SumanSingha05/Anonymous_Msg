import React from 'react';
import { Heart, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-glass)',
        padding: '2.5rem 0',
        marginTop: 'auto',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <ShieldCheck size={16} color="var(--success)" />
            <span>100% Anonymous & Secure</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <Sparkles size={16} color="var(--accent-primary)" />
            <span>Encrypted Delivery</span>
          </div>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} WhisperBox. Built with <Heart size={13} style={{ display: 'inline', color: '#ec4899', verticalAlign: 'middle' }} /> for genuine, fun connections.
        </p>
      </div>
    </footer>
  );
};
