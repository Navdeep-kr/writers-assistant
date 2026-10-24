'use client';

import { useState, useCallback, useEffect } from 'react';
import api from '@/lib/api';

export interface CloudDocument {
  id: string;
  userId: string;
  title: string;
  content: string;
  updatedAt: string;
}

const GUEST_DOCS_KEY = 'writing_assistant_guest_documents';
const TOKEN_KEY = 'writing_assistant_auth_token';

const DEFAULT_GUEST_DOCS: CloudDocument[] = [
  {
    id: 'sample-welcome-doc',
    userId: 'guest',
    title: 'Welcome to AI Writing Suite',
    content: `<h1>✨ Welcome to your AI Writing Assistant</h1>
<p>This is your personal workspace for distraction-free writing, academic research, and professional communication.</p>
<hr />
<h3>🚀 Quick Start Guide:</h3>
<ul>
  <li><strong>Check Grammar & Clarity:</strong> Click the suggestions pill on the right to auto-correct issues.</li>
  <li><strong>Smart Paraphrasing:</strong> Select any sentence to rephrase it into Academic, Creative, or Executive tone.</li>
  <li><strong>Multi-Format Import & Export:</strong> Drag and drop any PDF, Word document, or image to extract content instantly, or export to PDF, DOCX, and clean Print.</li>
  <li><strong>Cloud Sync:</strong> Sign in anytime to sync your documents securely across all your devices.</li>
</ul>
<p>Feel free to start typing here or paste your text to experience live AI enhancements!</p>`,
    updatedAt: new Date().toISOString()
  }
];

export const useDocuments = () => {
  const [documents, setDocuments] = useState<CloudDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeDocId, setActiveDocId] = useState<string | null>(null);

  // Helper to load guest documents from localStorage
  const loadGuestDocs = useCallback((): CloudDocument[] => {
    if (typeof window === 'undefined') return DEFAULT_GUEST_DOCS;
    try {
      const stored = localStorage.getItem(GUEST_DOCS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      localStorage.setItem(GUEST_DOCS_KEY, JSON.stringify(DEFAULT_GUEST_DOCS));
      return DEFAULT_GUEST_DOCS;
    } catch {
      return DEFAULT_GUEST_DOCS;
    }
  }, []);

  // Helper to save guest documents to localStorage
  const saveGuestDocsLocally = useCallback((docs: CloudDocument[]) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(GUEST_DOCS_KEY, JSON.stringify(docs));
      } catch (e) {
        console.warn('Could not persist guest documents:', e);
      }
    }
  }, []);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;

    if (!token) {
      // Guest mode: load immediately from localStorage without triggering 401
      const localDocs = loadGuestDocs();
      setDocuments(localDocs);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get('/db/documents');
      const cloudDocs = res.data.documents || [];
      
      // If user has local guest docs not yet in cloud, merge them seamlessly
      const localDocs = loadGuestDocs();
      const nonSampleLocalDocs = localDocs.filter(d => d.id !== 'sample-welcome-doc');
      
      if (nonSampleLocalDocs.length > 0) {
        // Sync any pending guest docs to cloud
        for (const doc of nonSampleLocalDocs) {
          if (!cloudDocs.some((cd: CloudDocument) => cd.id === doc.id || cd.title === doc.title)) {
            try {
              const syncedRes = await api.post('/db/documents', {
                title: doc.title,
                content: doc.content
              });
              if (syncedRes.data?.document) {
                cloudDocs.unshift(syncedRes.data.document);
              }
            } catch {}
          }
        }
        // Clear guest storage once synced
        localStorage.removeItem(GUEST_DOCS_KEY);
      }

      setDocuments(cloudDocs.length > 0 ? cloudDocs : DEFAULT_GUEST_DOCS);
    } catch (err: any) {
      console.warn('Cloud sync unavailable, falling back to local storage:', err.message);
      const localDocs = loadGuestDocs();
      setDocuments(localDocs);
    } finally {
      setLoading(false);
    }
  }, [loadGuestDocs]);

  const saveDocument = useCallback(async (id: string | null, title: string, content: string): Promise<CloudDocument> => {
    const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;

    if (token) {
      try {
        const res = await api.post('/db/documents', { id, title, content });
        const savedDoc: CloudDocument = res.data.document;

        setActiveDocId(savedDoc.id);
        setDocuments(prev => {
          const index = prev.findIndex(d => d.id === savedDoc.id);
          if (index > -1) {
            const newDocs = [...prev];
            newDocs[index] = savedDoc;
            return newDocs;
          }
          return [savedDoc, ...prev];
        });

        return savedDoc;
      } catch (err) {
        console.warn('Cloud save failed, falling back to local save:', err);
      }
    }

    // Guest / Offline fallback saving
    const docId = id || `guest-doc-${Date.now()}`;
    const localDoc: CloudDocument = {
      id: docId,
      userId: 'guest',
      title: title || 'Untitled Document',
      content: content || '',
      updatedAt: new Date().toISOString()
    };

    setActiveDocId(localDoc.id);
    setDocuments(prev => {
      const index = prev.findIndex(d => d.id === localDoc.id);
      let updated: CloudDocument[];
      if (index > -1) {
        updated = [...prev];
        updated[index] = localDoc;
      } else {
        updated = [localDoc, ...prev];
      }
      saveGuestDocsLocally(updated);
      return updated;
    });

    return localDoc;
  }, [saveGuestDocsLocally]);

  const deleteDocument = useCallback(async (id: string) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;

    if (token) {
      try {
        await api.delete(`/db/documents/${id}`);
      } catch (err) {
        console.warn('Cloud delete error:', err);
      }
    }

    setDocuments(prev => {
      const updated = prev.filter(d => d.id !== id);
      saveGuestDocsLocally(updated);
      return updated;
    });

    if (activeDocId === id) setActiveDocId(null);
  }, [activeDocId, saveGuestDocsLocally]);

  // Initial fetch on mount
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return {
    documents,
    loading,
    activeDocId,
    setActiveDocId,
    fetchDocuments,
    saveDocument,
    deleteDocument
  };
};

