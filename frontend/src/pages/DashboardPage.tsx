import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import type { Message } from '../types';
import { MessageCard } from '../components/MessageCard';
import {
  Copy,
  Check,
  Share2,
  RefreshCw,
  MessageSquare,
  Search,
  ExternalLink,
  Link as LinkIcon,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const publicUrl = `${window.location.origin}/u/${user?.username}`;

  const fetchMessages = async (isManual = false) => {
    try {
      if (isManual) setRefreshing(true);
      const res = await api.get<{ success: boolean; messages: Message[] }>('/messages');
      if (res.data.success && res.data.messages) {
        setMessages(res.data.messages);
      }
    } catch (err) {
      console.error('Failed to load messages', err);
    } finally {
      setLoading(false);
      if (isManual) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(
      `Send me anonymous messages & questions! 👉 ${publicUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(
      `Send me anonymous messages! 🤫\n${publicUrl}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const filteredMessages = messages.filter((m) =>
    m.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem 0 4rem', position: 'relative' }}>
      <div className="container">
        {/* Top Profile & Share Card */}
        <div
          className="glass-card"
          style={{
            padding: '1.75rem',
            marginBottom: '1.75rem',
            backgroundColor: '#ffffff',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* Header info */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#18181b', marginBottom: '0.2rem' }}>
                  @{user?.username}
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Share your link to receive anonymous messages
                </p>
              </div>

              {/* Link preview pill */}
              <a
                href={publicUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{
                  padding: '0.5rem 0.9rem',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>View Public Page</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {/* Link Box & Copy Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: 'var(--bg-tertiary)',
                padding: '0.5rem 0.65rem 0.5rem 1rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--border-color)',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '200px' }}>
                <LinkIcon size={14} color="#71717a" />
                <div
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {publicUrl}
                </div>
              </div>

              <button
                onClick={handleCopyLink}
                className="btn-primary"
                style={{
                  padding: '0.55rem 1.1rem',
                  fontSize: '0.825rem',
                  borderRadius: '0.6rem',
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy Link'}</span>
              </button>
            </div>

            {/* Quick Share Buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
              }}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Share to:
              </span>
              <button
                onClick={shareToWhatsApp}
                className="btn-secondary"
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', borderRadius: '0.6rem' }}
              >
                <Share2 size={13} /> WhatsApp
              </button>
              <button
                onClick={shareToTwitter}
                className="btn-secondary"
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', borderRadius: '0.6rem' }}
              >
                <Share2 size={13} /> Twitter / X
              </button>
            </div>
          </div>
        </div>

        {/* Messages Header & Controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#18181b' }}>
              Messages
            </h2>
            <span
              style={{
                backgroundColor: '#18181b',
                color: '#ffffff',
                padding: '0.15rem 0.55rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              {messages.length}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', width: '200px' }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{
                  padding: '0.45rem 0.65rem 0.45rem 2rem',
                  fontSize: '0.825rem',
                  borderRadius: '0.6rem',
                }}
              />
              <Search
                size={13}
                style={{
                  position: 'absolute',
                  left: '0.65rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => fetchMessages(true)}
              className="btn-icon"
              title="Refresh messages"
              style={{ width: '2.1rem', height: '2.1rem', borderRadius: '0.6rem' }}
            >
              <RefreshCw
                size={14}
                style={{
                  animation: refreshing ? 'spin 1s linear infinite' : 'none',
                }}
              />
            </button>
          </div>
        </div>

        {/* Messages Feed */}
        {loading ? (
          <div
            style={{
              padding: '3rem 0',
              textAlign: 'center',
              color: 'var(--text-secondary)',
            }}
          >
            <div style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>
              <RefreshCw size={24} color="#18181b" />
            </div>
            <p style={{ marginTop: '0.75rem', fontSize: '0.875rem' }}>Loading messages...</p>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div
            className="glass-card"
            style={{
              padding: '3.5rem 2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: '#ffffff',
            }}
          >
            <div
              style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '0.85rem',
                backgroundColor: 'var(--bg-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#18181b',
              }}
            >
              <MessageSquare size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
              {searchQuery ? 'No matching messages' : 'No messages yet'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '380px', fontSize: '0.875rem' }}>
              {searchQuery
                ? 'Try a different keyword.'
                : 'Share your link on your social accounts to start receiving messages.'}
            </p>
            {!searchQuery && (
              <button
                onClick={handleCopyLink}
                className="btn-primary"
                style={{ marginTop: '0.5rem', padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>{copied ? 'Copied' : 'Copy Your Link'}</span>
              </button>
            )}
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: '1rem',
            }}
          >
            {filteredMessages.map((msg) => (
              <MessageCard
                key={msg.id}
                message={msg}
                username={user?.username || 'user'}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
