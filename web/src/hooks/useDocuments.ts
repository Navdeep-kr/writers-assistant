'use client';

import { useState, useCallback } from 'react';
import api from '@/lib/api';

export interface CloudDocument {
  id: string;
  userId: string;
  title: string;
  content: string;
  updatedAt: string;
}

export const useDocuments = () => {
  const [documents, setDocuments] = useState<CloudDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeDocId, setActiveDocId] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    try {
      // Passes 'dummy-token' implicitly via API base (or whatever auth token is in localStorage in the future)
      const res = await api.get('/db/documents');
      setDocuments(res.data.documents || []);
    } catch (err) {
      console.error('Fetch docs error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveDocument = useCallback(async (id: string | null, title: string, content: string) => {
    try {
      const res = await api.post('/db/documents', { id, title, content });
      const savedDoc = res.data.document;
      
      // Update local state smoothly
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
      console.error('Save doc error:', err);
    }
  }, []);

  const deleteDocument = useCallback(async (id: string) => {
    try {
      await api.delete(`/db/documents/${id}`);
      setDocuments(prev => prev.filter(d => d.id !== id));
      if (activeDocId === id) setActiveDocId(null);
    } catch (err) {
      console.error('Delete doc error:', err);
    }
  }, [activeDocId]);

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
