// src/components/FloatingActionButton.js
import React from 'react';
import '../styles/FloatingActionButton.css';

function FloatingActionButton({ onClick, label, disabled }) {
  return (
    <button
      className={`floating-action-button ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default FloatingActionButton;
