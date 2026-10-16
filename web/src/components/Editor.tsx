'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu as BubbleMenuComponent } from '@tiptap/react/menus';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import Highlight from '@tiptap/extension-highlight';
import { LintExtension } from '@/lib/lintExtension';
import { HeatmapExtension } from '@/lib/heatmapExtension';
import { GhostExtension } from '@/lib/ghostExtension';
import styles from './Editor.module.css';
import api from '@/lib/api';
import { io, Socket } from 'socket.io-client';
import { Copy, Check, Sparkles, Wand2 } from 'lucide-react';

interface EditorProps {
  docId?: string;
  docTitle?: string;
  onTitleChange?: (title: string) => void;
  content?: string;
  onChange?: (html: string, text: string, editor: any) => void;
  onSelection?: (text: string) => void;
  loading?: boolean;
  isFocusMode?: boolean;
  onToggleFocus?: () => void;
  onAIAction?: (action: string, text: string) => void;
}

const Editor: React.FC<EditorProps> = ({ 
  docId = 'default', 
  docTitle = '',
  onTitleChange,
  content = '', 
  onChange, 
  onSelection, 
  loading,
  isFocusMode,
  onToggleFocus,
  onAIAction
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [synonymLoading, setSynonymLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      BubbleMenu,
      Placeholder.configure({
        placeholder: 'Start writing or paste your draft here...',
      }),
      CharacterCount,
      Highlight.configure({
        multicolor: true,
      }),
      LintExtension,
      HeatmapExtension,
      GhostExtension,
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = editor.getText();
      onChange?.(html, text, editor);
      
      if (socket) {
        socket.emit('update-content', { docId, content: html });
      }
    },
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      const text = editor.state.doc.textBetween(from, to, ' ');
      onSelection?.(text);
      
      if (socket) {
        socket.emit('cursor-move', { docId, range: { from, to } });
      }
    },
    editorProps: {
      attributes: {
        class: styles.prose,
      },
    },
  });

  // Sync content if changed externally (e.g. document loaded from DB)
  useEffect(() => {
    if (editor && content !== undefined && editor.getHTML() !== content) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  // WebSocket sync for collaborative/cloud editing
  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 
      (process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, '') : 'http://localhost:4000');
    const s = io(socketUrl);
    setSocket(s);
    s.emit('join-document', docId);

    s.on('receive-update', (data) => {
      if (editor && data.docId === docId) {
        if (editor.getHTML() !== data.content) {
          editor.commands.setContent(data.content, { emitUpdate: false });
        }
      }
    });

    return () => {
      s.disconnect();
    };
  }, [docId, editor]);

  const handleDoubleClick = useCallback(async () => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, ' ').trim();
    
    if (selectedText && !selectedText.includes(' ')) {
      setSynonymLoading(true);
      try {
        const context = editor.state.doc.textBetween(Math.max(0, from - 50), Math.min(editor.state.doc.content.size, to + 50), ' ');
        const response = await api.post('/ai/synonyms', { word: selectedText, context });
        setSynonyms(response.data.synonyms || []);
      } catch (err) {
        console.error('Synonym Error:', err);
      } finally {
        setSynonymLoading(false);
      }
    } else {
      setSynonyms([]);
    }
  }, [editor]);

  const applySynonym = (synonym: string) => {
    if (!editor) return;
    editor.commands.insertContent(synonym);
    setSynonyms([]);
  };

  const handleCopyDocument = () => {
    if (!editor) return;
    const text = editor.getText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!editor) {
    return <div className={styles.loading}>Opening writing studio...</div>;
  }

  const wordCount = editor.storage.characterCount.words();
  const charCount = editor.storage.characterCount.characters();
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className={`${styles.editorContainer} ${isFocusMode ? styles.zenActive : ''}`} onDoubleClick={handleDoubleClick}>
      {/* Document Title Header */}
      <div className={styles.docHeader}>
        <input
          type="text"
          className={styles.docTitleInput}
          placeholder="Untitled Document"
          value={docTitle}
          onChange={(e) => onTitleChange && onTitleChange(e.target.value)}
        />
      </div>

      {/* Bubble Menu for Text Selection */}
      <BubbleMenuComponent editor={editor}>
        <div className={`${styles.bubbleMenu} glass-strong`}>
          <div className={styles.menuGroup}>
            <button 
              onClick={() => editor.chain().focus().toggleBold().run()} 
              className={`${styles.menuBtn} ${editor.isActive('bold') ? styles.menuBtnActive : ''}`}
              title="Bold (Ctrl+B)"
            >
              <b>B</b>
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleItalic().run()} 
              className={`${styles.menuBtn} ${editor.isActive('italic') ? styles.menuBtnActive : ''}`}
              title="Italic (Ctrl+I)"
            >
              <i>I</i>
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleHighlight().run()} 
              className={`${styles.menuBtn} ${editor.isActive('highlight') ? styles.menuBtnActive : ''}`}
              title="Highlight"
            >
              ✨
            </button>
          </div>

          <div className={styles.menuGroup}>
            <button 
              onClick={() => onAIAction?.('simplify', editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to))}
              className={styles.menuBtn}
            >
              💡 Simplify
            </button>
            <button 
              onClick={() => onAIAction?.('elaborate', editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to))}
              className={styles.menuBtn}
            >
              <Wand2 size={13} />
              Rephrase
            </button>
          </div>

          <div className={styles.menuGroup}>
            {synonymLoading ? (
              <span className={styles.bubbleText}>...</span>
            ) : synonyms.length > 0 ? (
              <div className={styles.synonymList}>
                {synonyms.slice(0, 3).map((s, i) => (
                  <button key={i} onClick={() => applySynonym(s)} className={styles.synonymBtn}>{s}</button>
                ))}
              </div>
            ) : (
              <button className={styles.menuBtn} onClick={handleDoubleClick}>🔍 Synonyms</button>
            )}
          </div>
        </div>
      </BubbleMenuComponent>

      {/* Main Document Canvas */}
      <div className={styles.editor}>
        <EditorContent editor={editor} />
      </div>

      {/* Clean Bottom Status Bar */}
      <div className={styles.footer}>
        <div className={styles.stats}>
          <span className={styles.statItem}>
            <b>{wordCount}</b> words
          </span>
          <span className={styles.statDot}>•</span>
          <span className={styles.statItem}>
            <b>{charCount}</b> characters
          </span>
          <span className={styles.statDot}>•</span>
          <span className={styles.statItem}>
            ~{readingTime} min read
          </span>
        </div>
        
        <div className={styles.status}>
          {loading && (
            <span className={styles.loadingPulse}>
              <Sparkles size={13} className={styles.spinIcon} /> Analyzing text...
            </span>
          )}
          <button 
            className={styles.copyDocBtn}
            onClick={handleCopyDocument}
            title="Copy full document text"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy All'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
