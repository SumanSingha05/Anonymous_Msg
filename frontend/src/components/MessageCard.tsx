import React, { useState } from 'react';
import type { Message } from '../types';
import { Copy, Check, Share2, X, Download } from 'lucide-react';

interface MessageCardProps {
  message: Message;
  username: string;
}

export const MessageCard: React.FC<MessageCardProps> = ({ message, username }) => {
  const [copied, setCopied] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);

  const formattedDate = new Date(message.created_at).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div
        className="glass-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          padding: '1.25rem',
          backgroundColor: '#ffffff',
        }}
      >
        {/* Header with badge & timestamp */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.85rem',
          }}
        >
          <span className="badge">
            Anonymous
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {formattedDate}
          </span>
        </div>

        {/* Message Text */}
        <p
          style={{
            fontSize: '0.95rem',
            lineHeight: 1.55,
            color: '#18181b',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
            marginBottom: '1rem',
            fontWeight: 500,
          }}
        >
          "{message.content}"
        </p>

        {/* Action buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '0.4rem',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '0.75rem',
          }}
        >
          <button
            onClick={handleCopy}
            className="btn-secondary"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              borderRadius: '0.5rem',
            }}
            title="Copy text"
          >
            {copied ? <Check size={13} color="var(--success)" /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={() => setShowStoryModal(true)}
            className="btn-primary"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              borderRadius: '0.5rem',
            }}
          >
            <Share2 size={13} />
            <span>Share Card</span>
          </button>
        </div>
      </div>

      {/* Story Preview Modal */}
      {showStoryModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            animation: 'fadeIn 0.2s ease',
          }}
          onClick={() => setShowStoryModal(false)}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '360px',
              width: '100%',
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#18181b' }}>Story Card</h3>
              <button
                onClick={() => setShowStoryModal(false)}
                className="btn-icon"
                style={{ width: '1.8rem', height: '1.8rem', borderRadius: '0.4rem' }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Story Card */}
            <div
              id="story-card"
              style={{
                backgroundColor: '#18181b',
                borderRadius: '1rem',
                padding: '1.5rem 1.25rem',
                color: '#ffffff',
                textAlign: 'center',
                boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                send me anonymous messages
              </div>

              <div
                style={{
                  backgroundColor: '#ffffff',
                  color: '#18181b',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  width: '100%',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  lineHeight: 1.45,
                  minHeight: '70px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  wordBreak: 'break-word',
                }}
              >
                {message.content}
              </div>

              <span style={{ fontSize: '0.75rem', color: '#a1a1aa', fontWeight: 500 }}>
                anonmsg.me/u/{username}
              </span>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Screenshot and post to your Instagram, Snapchat, or WhatsApp Story!
            </p>

            <button
              onClick={() => {
                navigator.clipboard.writeText(`"${message.content}" - Send me anonymous messages on ${window.location.origin}/u/${username}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="btn-primary"
              style={{ width: '100%', padding: '0.7rem' }}
            >
              {copied ? <Check size={14} /> : <Download size={14} />}
              <span>{copied ? 'Caption Copied!' : 'Copy Caption & Link'}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
