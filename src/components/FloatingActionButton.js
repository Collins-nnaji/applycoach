import React from 'react';

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