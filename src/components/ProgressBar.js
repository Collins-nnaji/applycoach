import React from 'react';

function ProgressBar({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-bar">
      <div className="progress-bar-inner" style={{ width: `${progress}%` }}></div>
      <div className="progress-steps">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`progress-step ${i < currentStep ? 'completed' : ''} ${i === currentStep - 1 ? 'current' : ''}`}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressBar;