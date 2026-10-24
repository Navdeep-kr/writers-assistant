'use client';

import React from 'react';

const IndexPopup = () => {
  return (
    <div style={{
      width: '300px',
      padding: '20px',
      backgroundColor: '#0a0a0f',
      color: '#f8fafc',
      fontFamily: 'sans-serif'
    }}>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Writers Assistant</h2>
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '16px'
      }}>
        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Current Score</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6' }}>85</div>
      </div>
      <p style={{ fontSize: '0.875rem' }}>Active on this page.</p>
    </div>
  );
};

export default IndexPopup;
