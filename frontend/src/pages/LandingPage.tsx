import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Lock } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          textAlign: 'center',
          maxWidth: '740px',
          width: '100%',
        }}
      >
        {/* Top Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.9rem',
            borderRadius: '9999px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '1.75rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <Lock size={12} color="#52525b" />
          <span>Anonymous Messaging Platform</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
            color: '#18181b',
          }}
        >
          Shhhhhh! its anonymous!!!
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: '560px',
            margin: '0 auto 2.25rem',
          }}
        >
          Share your personal link on Instagram, Snapchat, or WhatsApp and get 100% anonymous feedback in complete privacy.
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          {user ? (
            <Link
              to="/dashboard"
              className="btn-primary"
              style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}
            >
              Go to Your Inbox <ArrowRight size={16} />
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="btn-primary"
                style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}
              >
                Create Your Link <ArrowRight size={16} />
              </Link>
              <Link
                to="/login"
                className="btn-secondary"
                style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}
              >
                Log In
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
};
