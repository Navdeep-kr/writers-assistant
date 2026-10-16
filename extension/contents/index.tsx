import type { PlasmoCSConfig } from "plasmo";
import React, { useEffect, useState, useRef } from "react";

export const config: PlasmoCSConfig = {
  matches: ["https://*/*"]
};

const WritingAssistantOverlay = () => {
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [loading, setLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      if (el.tagName === "TEXTAREA" || (el.tagName === "INPUT" && el.getAttribute("type") === "text") || el.contentEditable === "true") {
        setActiveElement(el);
      } else {
        // Only clear if we didn't click into our own panel
        if (!panelRef.current?.contains(e.relatedTarget as Node)) {
          setActiveElement(null);
          setShowPanel(false);
        }
      }
    };

    document.addEventListener("focusin", handleFocus);
    return () => document.removeEventListener("focusin", handleFocus);
  }, []);

  if (!activeElement) return null;

  const rect = activeElement.getBoundingClientRect();

  const handleAction = async (action: 'check-grammar' | 'professional' | 'simple') => {
    setLoading(true);
    const text = activeElement.innerText || (activeElement as HTMLInputElement).value;
    
    try {
      const endpoint = action === 'check-grammar' ? '/ai/check-grammar' : '/ai/improve-style';
      const body = action === 'check-grammar' ? { text } : { text, style: action };
      
      const response = await fetch(`http://localhost:4000/api${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      const result = data.improved || (data.matches && data.matches[0]?.replacements[0]?.value) || text;

      if (activeElement.contentEditable === "true") {
        activeElement.innerText = result;
      } else {
        (activeElement as HTMLInputElement).value = result;
      }
    } catch (err) {
      console.error("Magic Tool Error:", err);
    } finally {
      setLoading(false);
      setShowPanel(false);
    }
  };

  return (
    <div style={{ position: "absolute", zIndex: 2147483647, top: 0, left: 0, pointerEvents: "none", width: "100%", height: "100%" }}>
      {/* Floating Icon */}
      <div
        style={{
          position: "absolute",
          top: `${rect.top + window.scrollY + 5}px`,
          left: `${rect.right + window.scrollX - 35}px`,
          backgroundColor: "#3b82f6",
          color: "white",
          width: "28px",
          height: "28px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
          fontSize: "14px",
          pointerEvents: "auto",
          transition: "transform 0.2s ease",
          zIndex: 10
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
        onClick={() => setShowPanel(!showPanel)}
      >
        ✒️
      </div>

      {/* Action Panel */}
      {showPanel && (
        <div
          ref={panelRef}
          style={{
            position: "absolute",
            top: `${rect.top + window.scrollY + 40}px`,
            left: `${rect.right + window.scrollX - 180}px`,
            width: "200px",
            backgroundColor: "#0c0d0f",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "8px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            pointerEvents: "auto",
            zIndex: 11,
            backdropFilter: "blur(12px)"
          }}
        >
          <button 
            style={{ padding: "8px 12px", borderRadius: "6px", textAlign: "left", fontSize: "12px", color: "white", cursor: "pointer", background: "none", border: "none", transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            onClick={() => handleAction('check-grammar')}
          >
            ✨ Quick Fix Grammar
          </button>
          <button 
            style={{ padding: "8px 12px", borderRadius: "6px", textAlign: "left", fontSize: "12px", color: "white", cursor: "pointer", background: "none", border: "none", transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            onClick={() => handleAction('professional')}
          >
            💼 Professional Rewrite
          </button>
          <button 
            style={{ padding: "8px 12px", borderRadius: "6px", textAlign: "left", fontSize: "12px", color: "white", cursor: "pointer", background: "none", border: "none", transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            onClick={() => handleAction('simple')}
          >
            💡 Simplify Text
          </button>
          {loading && <div style={{ fontSize: "10px", color: "#22d3ee", padding: "4px 12px", animation: "pulse 1s infinite" }}>Processing magic...</div>}
        </div>
      )}
    </div>
  );
};

export default WritingAssistantOverlay;
