import React from 'react';
import './ProgressTracker.css';

function ProgressTracker({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-tracker">
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

export default ProgressTracker;
