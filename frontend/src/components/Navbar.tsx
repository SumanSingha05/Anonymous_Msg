import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, LogOut, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4rem',
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '0.5rem',
              backgroundColor: '#18181b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <MessageSquare size={16} />
          </div>
          <span
            style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#18181b',
            }}
          >
            Anon<span style={{ fontWeight: 500, color: '#71717a' }}>Msg</span>
          </span>
        </Link>

        {/* Desktop Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
          className="desktop-nav"
        >
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/dashboard" className="btn-primary" style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}>
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="btn-secondary"
                style={{ padding: '0.55rem 0.9rem', fontSize: '0.85rem' }}
                title="Log out"
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link
                to="/login"
                className="btn-secondary"
                style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="btn-primary"
                style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className="mobile-toggle"
        >
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-icon"
            aria-label="Menu"
            style={{ width: '2.2rem', height: '2.2rem' }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            backgroundColor: '#ffffff',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {user ? (
            <>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid var(--border-color)',
                }}
              >
                Signed in as <strong>@{user.username}</strong>
              </div>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                Go to Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <LogOut size={16} /> Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Get Started Free
              </Link>
            </>
          )}
        </div>
      )}

      <style>{`
        .mobile-toggle { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
};
