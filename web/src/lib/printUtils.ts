'use client';

/**
 * High-fidelity print utility that isolates the target subject document (e.g., Resume, Cover Letter,
 * Manuscript, or AI Output) and prints ONLY that subject without page chrome, sidebars, headers, footers,
 * or input forms.
 */

export function printElement(elementIdOrElement: string | HTMLElement, title?: string): boolean {
  if (typeof window === 'undefined') return false;

  const element = typeof elementIdOrElement === 'string'
    ? document.getElementById(elementIdOrElement)
    : elementIdOrElement;

  if (!element) {
    console.warn(`[printElement] Target element "${elementIdOrElement}" not found. Falling back to window.print()`);
    window.print();
    return false;
  }

  // 1. Gather all stylesheets and <style> tags from the parent document
  let stylesHtml = '';
  document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
    stylesHtml += link.outerHTML;
  });
  document.querySelectorAll('style').forEach(style => {
    stylesHtml += style.outerHTML;
  });

  // 2. Create an isolated hidden iframe
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.visibility = 'hidden';
  iframe.setAttribute('aria-hidden', 'true');

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    document.body.removeChild(iframe);
    window.print();
    return false;
  }

  const docTitle = title || 'Print Document';

  // 3. Write document into iframe with light-theme print overrides
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="en" data-theme="light">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${docTitle}</title>
        ${stylesHtml}
        <style>
          @page {
            size: A4 portrait;
            margin: 8mm 12mm 10mm 12mm;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            box-sizing: border-box !important;
          }
          :root, [data-theme], body {
            --bg-obsidian: #ffffff !important;
            --bg-card: #ffffff !important;
            --bg-elevated: #f8fafc !important;
            --text-primary: #0f172a !important;
            --text-secondary: #334155 !important;
            --text-muted: #64748b !important;
            --glass-bg: #ffffff !important;
            --glass-border: #e2e8f0 !important;
            --glass-border-strong: #cbd5e1 !important;
            --accent-cyan: #0284c7 !important;
            --accent-blue: #2563eb !important;
            --accent-indigo: #4f46e5 !important;
            --accent-violet: #7c3aed !important;
            background: #ffffff !important;
            color: #0f172a !important;
            margin: 0 !important;
            padding: 0 !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
            width: 100% !important;
          }
          
          /* Full width and reset starting point */
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
          }
          
          .print-subject-root {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            box-shadow: none !important;
            border: none !important;
            overflow: visible !important;
            max-height: none !important;
          }

          /* Ensure all child container elements don't constrain height or clip text */
          .print-subject-root * {
            max-height: none !important;
            overflow: visible !important;
          }

          /* ABSOLUTE GUARANTEE: Never hide document headers, asides, sections, candidate names, or details */
          .print-subject-root header,
          .print-subject-root aside,
          .print-subject-root main,
          .print-subject-root section,
          .print-subject-root article,
          .print-subject-root div,
          .print-subject-root h1,
          .print-subject-root h2,
          .print-subject-root h3,
          .print-subject-root h4,
          .print-subject-root p,
          .print-subject-root span,
          .print-subject-root ul,
          .print-subject-root li,
          .print-header,
          .print-keep {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
          }

          /* Silicon Split Print Layout: Side-by-side dual columns */
          .print-subject-root [class*="tplSiliconSplit"] {
            display: flex !important;
            flex-direction: row !important;
            width: 100% !important;
            border-radius: 0 !important;
            border: 1px solid #cbd5e1 !important;
            background: #ffffff !important;
            box-shadow: none !important;
          }

          .print-subject-root [class*="siliconSidebar"] {
            display: flex !important;
            flex-direction: column !important;
            width: 32% !important;
            min-width: 32% !important;
            background: #f8fafc !important;
            border-right: 1.5px solid #cbd5e1 !important;
            padding: 18px 14px !important;
            gap: 14px !important;
          }

          .print-subject-root [class*="siliconMain"] {
            display: flex !important;
            flex-direction: column !important;
            width: 68% !important;
            padding: 18px 20px !important;
            gap: 16px !important;
          }

          .print-subject-root [class*="avatarInitials"] {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 48px !important;
            height: 48px !important;
            border-radius: 10px !important;
            background: #0284c7 !important;
            color: #ffffff !important;
            font-size: 1.25rem !important;
            font-weight: 800 !important;
            margin-bottom: 6px !important;
          }

          .print-subject-root [class*="contactBadges"],
          .print-subject-root [class*="skillsPillList"] {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 6px !important;
          }

          .print-subject-root [class*="sidebarContactList"] {
            display: flex !important;
            flex-direction: column !important;
            gap: 5px !important;
          }

          .print-subject-root [class*="contactBadgeItem"] {
            display: inline-flex !important;
            align-items: center !important;
            gap: 4px !important;
            font-size: 9.5pt !important;
            color: #475569 !important;
          }

          /* Designer Resume Header & Upper Details */
          .print-subject-root [class*="designerResumeSheet"] {
            display: block !important;
            width: 100% !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            background: #ffffff !important;
            overflow: visible !important;
          }

          .print-subject-root [class*="resumeHeader"],
          .print-subject-root header {
            display: block !important;
            width: 100% !important;
            border-bottom: 2px solid #0f172a !important;
            padding-bottom: 12px !important;
            margin-bottom: 16px !important;
          }

          .print-subject-root [class*="candidateName"],
          .print-subject-root h2[class*="candidateName"],
          .print-subject-root h3 {
            display: block !important;
            font-size: 24pt !important;
            font-weight: 800 !important;
            line-height: 1.15 !important;
            color: #0f172a !important;
            margin: 0 0 4px 0 !important;
            letter-spacing: -0.02em !important;
          }

          .print-subject-root [class*="siliconSidebar"] h3 {
            font-size: 15pt !important;
          }

          .print-subject-root [class*="targetRole"] {
            display: block !important;
            font-size: 12pt !important;
            font-weight: 700 !important;
            color: #0284c7 !important;
            margin: 0 0 6px 0 !important;
          }

          .print-subject-root [class*="skillTag"] {
            display: inline-block !important;
            padding: 2px 7px !important;
            border-radius: 4px !important;
            background: #f1f5f9 !important;
            border: 1px solid #cbd5e1 !important;
            color: #1e293b !important;
            font-size: 8pt !important;
            font-weight: 600 !important;
          }

          .print-subject-root [class*="resumeSectionTitle"],
          .print-subject-root [class*="sidebarSectionTitle"] {
            display: block !important;
            font-size: 10.5pt !important;
            font-weight: 800 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.08em !important;
            color: #0f172a !important;
            border-bottom: 1px solid #e2e8f0 !important;
            padding-bottom: 3px !important;
            margin: 12px 0 6px 0 !important;
          }

          .print-subject-root [class*="summaryCallout"] {
            background: #f8fafc !important;
            border-left: 3px solid #0284c7 !important;
            padding: 8px 12px !important;
            font-size: 9pt !important;
            line-height: 1.5 !important;
            color: #334155 !important;
            margin-bottom: 12px !important;
          }

          .print-subject-root [class*="expRole"] {
            font-size: 10.5pt !important;
            font-weight: 700 !important;
            color: #0f172a !important;
          }

          .print-subject-root [class*="expBullets"] {
            margin: 4px 0 8px 18px !important;
            padding: 0 !important;
          }

          .print-subject-root [class*="expBullets"] li {
            margin-bottom: 3px !important;
            font-size: 9pt !important;
            line-height: 1.45 !important;
            color: #334155 !important;
          }

          /* Hide unwanted buttons or interactive controls that might be inside */
          button, input, textarea, select, .no-print, [data-no-print="true"] {
            display: none !important;
          }

          /* Prevent breaking titles across pages */
          h1, h2, h3, h4, header, section {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        </style>
      </head>
      <body>
        <div class="print-subject-root">
          ${element.outerHTML}
        </div>
      </body>
    </html>
  `);
  doc.close();

  // 4. Trigger print after styles render
  setTimeout(() => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch (err) {
      console.error('[printElement] Error triggering print inside iframe:', err);
      window.print();
    } finally {
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 1500);
    }
  }, 350);

  return true;
}

/**
 * Format markdown or plain text content into a publication-ready document and print it cleanly.
 */
export function printFormattedDocument(title: string, content: string): boolean {
  if (typeof window === 'undefined') return false;

  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.visibility = 'hidden';

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    document.body.removeChild(iframe);
    window.print();
    return false;
  }

  // Convert simple markdown headings, lists, bold, italics, and linebreaks
  const formattedHtml = content
    .split(/\n\s*\n/)
    .map(block => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('# ')) {
        return `<h1 style="font-size: 1.6rem; font-weight: 800; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin: 20px 0 12px;">${escapeHtml(trimmed.slice(2))}</h1>`;
      }
      if (trimmed.startsWith('## ')) {
        return `<h2 style="font-size: 1.3rem; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin: 18px 0 10px;">${escapeHtml(trimmed.slice(3))}</h2>`;
      }
      if (trimmed.startsWith('### ')) {
        return `<h3 style="font-size: 1.1rem; font-weight: 600; margin: 16px 0 8px;">${escapeHtml(trimmed.slice(4))}</h3>`;
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n').map(item => `<li>${escapeHtml(item.replace(/^[-*]\s*/, ''))}</li>`).join('');
        return `<ul style="margin: 8px 0 14px 24px; padding: 0; line-height: 1.6;">${items}</ul>`;
      }
      return `<p style="margin: 0 0 14px 0; line-height: 1.7; text-align: justify;">${escapeHtml(trimmed).replace(/\n/g, '<br/>')}</p>`;
    })
    .join('');

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>${title}</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 15mm 18mm;
          }
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body {
            font-family: 'Georgia', 'Cambria', serif;
            color: #1e293b;
            background: #ffffff;
            margin: 0;
            padding: 20px 30px;
            line-height: 1.7;
          }
          .doc-header {
            border-bottom: 2px solid #0f172a;
            padding-bottom: 14px;
            margin-bottom: 24px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .doc-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }
          .doc-date {
            font-size: 0.85rem;
            color: #64748b;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }
          .doc-body {
            font-size: 1.02rem;
          }
        </style>
      </head>
      <body>
        <div class="doc-header">
          <h1 class="doc-title">${escapeHtml(title)}</h1>
          <span class="doc-date">${new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div class="doc-body">
          ${formattedHtml}
        </div>
      </body>
    </html>
  `);
  doc.close();

  setTimeout(() => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch (e) {
      console.error('[printFormattedDocument] Error printing:', e);
    } finally {
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 1500);
    }
  }, 350);

  return true;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
