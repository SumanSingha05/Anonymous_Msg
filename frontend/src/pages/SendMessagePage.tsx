import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import confetti from 'canvas-confetti';
import {
  Send,
  Dices,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
} from 'lucide-react';

const SUGGESTED_PROMPTS = [
  "What's one thing you never told me?",
  "Describe me in 3 words",
  "What was your first impression of me?",
  "Send me a song recommendation",
  "What is my biggest red flag?",
  "If we could go anywhere together, where would we go?",
  "Confess something you never said out loud",
  "What's the best advice you'd give me?",
  "Ask me anything honestly, no filter",
  "Tell me a secret you've never told anyone else",
];

export const SendMessagePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await api.get(`/users/${username}`);
        if (res.data.success) {
          setUserExists(true);
        } else {
          setUserExists(false);
        }
      } catch {
        setUserExists(false);
      }
    };

    if (username) {
      verifyUser();
    }
  }, [username]);

  const handleRollDice = () => {
    const nextPrompt =
      SUGGESTED_PROMPTS[Math.floor(Math.random() * SUGGESTED_PROMPTS.length)];
    setContent(nextPrompt);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setError('');
    setLoading(true);

    try {
      const res = await api.post(`/messages/${username}`, {
        content: content.trim(),
      });

      if (res.data.success) {
        setSentSuccess(true);
        setContent('');

        // Clean subtle confetti
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#18181b', '#71717a', '#a1a1aa'],
        });
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Failed to send message. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (userExists === false) {
    return (
      <div
        style={{
          minHeight: 'calc(100vh - 120px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1rem',
        }}
      >
        <div className="container" style={{ maxWidth: '420px' }}>
          <div className="glass-card" style={{ padding: '3rem 2rem', textAlign: 'center', backgroundColor: '#ffffff' }}>
            <div
              style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '0.75rem',
                backgroundColor: '#fef2f2',
                color: 'var(--danger)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
              }}
            >
              <AlertCircle size={28} />
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#18181b', marginBottom: '0.5rem' }}>
              User Not Found
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', fontSize: '0.9rem' }}>
              The profile <strong>@{username}</strong> does not exist.
            </p>
            <Link to="/" className="btn-primary" style={{ width: '100%' }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 120px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1rem',
        position: 'relative',
      }}
    >
      <div className="container" style={{ maxWidth: '440px' }}>
        {sentSuccess ? (
          <div
            className="glass-card animate-fade-in"
            style={{
              padding: '2.75rem 2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              backgroundColor: '#ffffff',
            }}
          >
            <div
              style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                backgroundColor: '#f4f4f5',
                color: '#18181b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle2 size={32} />
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#18181b' }}>
              Message Sent
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '300px' }}>
              Your anonymous message was delivered to <strong>@{username}</strong>.
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                width: '100%',
                marginTop: '1rem',
              }}
            >
              <button
                onClick={() => setSentSuccess(false)}
                className="btn-secondary"
                style={{ width: '100%', padding: '0.75rem' }}
              >
                Send Another Message
              </button>

              <Link
                to="/register"
                className="btn-primary"
                style={{ width: '100%', padding: '0.75rem' }}
              >
                <PlusCircle size={16} />
                <span>Get Your Own Link</span>
              </Link>
            </div>
          </div>
        ) : (
          <div
            className="glass-card"
            style={{
              padding: '1.75rem',
              backgroundColor: '#ffffff',
            }}
          >
            {/* User Profile Header Card */}
            <div
              style={{
                backgroundColor: '#18181b',
                borderRadius: '0.85rem',
                padding: '1.5rem 1.25rem',
                color: '#ffffff',
                textAlign: 'center',
                marginBottom: '1.25rem',
                position: 'relative',
              }}
            >
              {/* Roll prompt button */}
              <button
                onClick={handleRollDice}
                type="button"
                style={{
                  position: 'absolute',
                  top: '0.85rem',
                  right: '0.85rem',
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  borderRadius: '0.4rem',
                  color: '#ffffff',
                  padding: '0.3rem 0.6rem',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  transition: 'background 0.2s ease',
                }}
                title="Shuffle question into message box"
              >
                <Dices size={14} /> Dice
              </button>

              {/* Profile Avatar Pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  marginBottom: '0.65rem',
                }}
              >
                <span>@{username}</span>
              </div>

              <h2
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  lineHeight: 1.35,
                  padding: '0 0.5rem',
                }}
              >
                send me anonymous messages!
              </h2>
            </div>

            {error && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fee2e2',
                  color: 'var(--danger)',
                  padding: '0.75rem 0.9rem',
                  borderRadius: '0.65rem',
                  fontSize: '0.85rem',
                  marginBottom: '1.25rem',
                }}
              >
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  maxLength={500}
                  placeholder={`Write an honest anonymous message to @${username}... or click 'Dice' above for ideas`}
                  rows={4}
                  className="input-field"
                  style={{
                    resize: 'none',
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                  }}
                  required
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '0.65rem',
                    right: '0.85rem',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  {content.length}/500
                </span>
              </div>

              {/* Privacy badge */}


              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  fontSize: '0.95rem',
                }}
                disabled={loading || !content.trim()}
              >
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    <Send size={16} /> Send Anonymous Message
                  </>
                )}
              </button>
            </form>

            {/* Bottom CTA */}
            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-color)',
                textAlign: 'center',
              }}
            >
              <Link
                to="/register"
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Want your own anonymous link? Create free
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
