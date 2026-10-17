'use client';

import React, { useState, useRef } from 'react';
import styles from './FeatureTools.module.css';
import { printElement, printFormattedDocument } from '@/lib/printUtils';

interface FileImportBarProps {
  onFileLoaded: (text: string, fileName: string) => void;
  ai?: any;
  currentFileName?: string;
  onClearFile?: () => void;
  label?: string;
}

export const FileImportBar: React.FC<FileImportBarProps> = ({
  onFileLoaded,
  ai,
  currentFileName,
  onClearFile,
  label = 'Import File (PDF, DOCX, TXT, Images)'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const processFile = async (file: File) => {
    if (!file) return;
    setLoading(true);
    setStatusMsg(`Extracting text from ${file.name}...`);
    try {
      if (ai && typeof ai.extractFileContent === 'function') {
        const result = await ai.extractFileContent(file);
        if (result && result.text && result.text.trim().length > 0) {
          onFileLoaded(result.text, result.fileName || file.name);
          setStatusMsg(`✅ Imported ${result.text.trim().split(/\s+/).filter(Boolean).length} words from ${file.name}`);
          setTimeout(() => setStatusMsg(''), 4000);
        } else {
          setStatusMsg(`⚠️ No text could be extracted from ${file.name}. Please try another file.`);
          setTimeout(() => setStatusMsg(''), 5000);
        }
      } else {
        // Direct browser fallback
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = (e.target?.result as string) || '';
          if (text.trim().length > 0) {
            onFileLoaded(text, file.name);
            setStatusMsg(`✅ Imported ${file.name}`);
            setTimeout(() => setStatusMsg(''), 4000);
          } else {
            setStatusMsg(`⚠️ ${file.name} is empty.`);
            setTimeout(() => setStatusMsg(''), 4000);
          }
        };
        reader.readAsText(file);
      }
    } catch (err: any) {
      console.error('File extraction failed:', err);
      setStatusMsg(`⚠️ Error extracting ${file.name}. Please try a text, markdown, or image file.`);
      setTimeout(() => setStatusMsg(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    if (e.target) e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div
      className={`${styles.fileTransferBar} ${dragActive ? styles.fileTransferBarActive : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept=".pdf,.docx,.doc,.txt,.md,.markdown,.json,.csv,.rtf,.html,.png,.jpg,.jpeg,.webp,.svg,.bmp,image/*"
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <button
          type="button"
          className={styles.uploadTriggerBtn}
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          title="Import any PDF, Word DOCX, text file, or image with automatic OCR text extraction"
        >
          <span>{loading ? '⏳' : '📁'}</span>
          <span>{loading ? 'Transcribing...' : label}</span>
        </button>

        {currentFileName && !loading && (
          <div className={styles.activeFileChip}>
            <span>📄 {currentFileName}</span>
            {onClearFile && (
              <button
                type="button"
                className={styles.removeFileBtn}
                onClick={onClearFile}
                title="Remove attached file"
              >
                ×
              </button>
            )}
          </div>
        )}

        {statusMsg && (
          <span style={{ fontSize: '0.78rem', color: statusMsg.startsWith('✅') ? '#34d399' : '#f87171', fontWeight: 600 }}>
            {statusMsg}
          </span>
        )}
      </div>

      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
        PDF, DOCX, TXT, MD, &amp; Images supported
      </span>
    </div>
  );
};

interface UniversalExportDropdownProps {
  content: string;
  defaultTitle?: string;
  onCopy?: () => void;
  copied?: boolean;
  printTargetId?: string;
  onCustomPrint?: () => void;
}

export const UniversalExportDropdown: React.FC<UniversalExportDropdownProps> = ({
  content,
  defaultTitle = 'AI_Writing_Document',
  onCopy,
  copied = false,
  printTargetId,
  onCustomPrint
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalCopied, setInternalCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const cleanTitle = defaultTitle.replace(/[^a-zA-Z0-9_-]/g, '_');

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const handleExportTxt = () => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    downloadFile(blob, `${cleanTitle}.txt`);
  };

  const handleExportMd = () => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    downloadFile(blob, `${cleanTitle}.md`);
  };

  const handleExportDoc = () => {
    // Generate an HTML document formatted for Microsoft Word and Google Docs
    const formattedHtml = content
      .split('\n\n')
      .map(p => `<p style="margin-bottom: 12pt; line-height: 1.6; font-size: 11pt;">${p.replace(/\n/g, '<br/>')}</p>`)
      .join('');

    const wordHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${cleanTitle}</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; margin: 1in; color: #111827; }
          h1, h2, h3 { color: #1e3a8a; }
        </style>
      </head>
      <body>
        ${formattedHtml}
      </body>
      </html>
    `;
    const blob = new Blob([wordHtml], { type: 'application/msword;charset=utf-8' });
    downloadFile(blob, `${cleanTitle}.doc`);
  };

  const handlePrint = () => {
    setIsOpen(false);
    if (onCustomPrint) {
      onCustomPrint();
      return;
    }
    if (printTargetId) {
      printElement(printTargetId, cleanTitle.replace(/_/g, ' '));
      return;
    }
    printFormattedDocument(cleanTitle.replace(/_/g, ' '), content);
  };

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(content);
    if (onCopy) onCopy();
    setInternalCopied(true);
    setTimeout(() => setInternalCopied(false), 2000);
    setIsOpen(false);
  };

  return (
    <div className={styles.exportDropdownWrapper} ref={menuRef}>
      <button
        type="button"
        className={styles.exportDropdownTrigger}
        onClick={() => setIsOpen(!isOpen)}
        title="Export document in multiple formats (Word, PDF, Markdown, Text)"
      >
        <span>📥 Export</span>
        <span style={{ fontSize: '0.65rem' }}>▼</span>
      </button>

      {isOpen && (
        <div className={`fade-in ${styles.exportMenuDropdown}`}>
          <button type="button" className={styles.exportMenuItem} onClick={handleExportDoc}>
            <span>📝 Word Document</span>
            <span className={styles.exportFormatBadge}>.DOCX</span>
          </button>

          <button type="button" className={styles.exportMenuItem} onClick={handleExportMd}>
            <span>📄 Markdown</span>
            <span className={styles.exportFormatBadge}>.MD</span>
          </button>

          <button type="button" className={styles.exportMenuItem} onClick={handleExportTxt}>
            <span>📋 Plain Text</span>
            <span className={styles.exportFormatBadge}>.TXT</span>
          </button>

          <button type="button" className={styles.exportMenuItem} onClick={handlePrint}>
            <span>🖨️ Print / Save PDF</span>
            <span className={styles.exportFormatBadge}>.PDF</span>
          </button>

          <div style={{ height: '1px', background: 'var(--glass-border)', margin: '2px 0' }} />

          <button type="button" className={styles.exportMenuItem} onClick={handleCopyClipboard}>
            <span>{copied || internalCopied ? '✅ Copied' : '📋 Copy to Clipboard'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
