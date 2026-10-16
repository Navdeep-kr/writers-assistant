import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudDocument } from '@/hooks/useDocuments';

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
  documents: CloudDocument[];
  fetchDocuments: () => void;
  onSelect: (doc: CloudDocument) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
}

const DashboardModal: React.FC<DashboardProps> = ({ isOpen, onClose, documents, fetchDocuments, onSelect, onDelete, onNew }) => {
  
  useEffect(() => {
    if (isOpen) fetchDocuments();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)', zIndex: 9999
            }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '400px', height: '100vh',
              background: 'var(--bg-card)', borderRight: '1px solid var(--glass-border-strong)', 
              zIndex: 10000, padding: '32px', display: 'flex', flexDirection: 'column',
              boxShadow: 'var(--shadow-lg)', color: 'var(--text-primary)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>My Documents</h2>
              <button 
                onClick={onNew}
                style={{ background: 'rgba(34, 211, 238, 0.15)', color: 'var(--accent-cyan)', padding: '6px 14px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600, border: '1px solid rgba(34, 211, 238, 0.3)', cursor: 'pointer' }}
              >
                + New Draft
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {documents.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>No documents saved yet.</p>}
              {documents.map(doc => (
                <div key={doc.id} style={{
                  padding: '16px', background: 'var(--glass-bg)', borderRadius: '12px', border: '1px solid var(--glass-border)',
                  cursor: 'pointer', transition: 'all 0.2s', position: 'relative'
                }} onClick={() => onSelect(doc)}>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '4px', color: 'var(--text-primary)', fontWeight: 600 }}>{doc.title || 'Untitled'}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Last edited: {new Date(doc.updatedAt).toLocaleTimeString()}</p>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(doc.id); }}
                    style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--error)', background: 'transparent', border: 'none', cursor: 'pointer' }}
                    title="Delete document"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
            <button onClick={onClose} style={{ marginTop: '24px', padding: '12px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border-strong)', color: 'var(--text-primary)', borderRadius: '99px', fontWeight: 600, cursor: 'pointer' }}>
              Close Explorer
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DashboardModal;
