import React from 'react';
import './States.css';
import errorIcon from '../../assets/images/icon-error.svg';
import retryIcon from '../../assets/images/icon-retry.svg';

export const LoadingState: React.FC = () => (
  <div className="state-container loading-state">
    <div className="loading-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <p>Loading...</p>
  </div>
);

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => (
  <div className="state-container error-state">
    <img src={errorIcon} alt="" className="error-icon" />
    <h2>Something went wrong</h2>
    <p>{message}</p>
    <button onClick={onRetry} className="retry-btn">
      <img src={retryIcon} alt="" />
      Retry
    </button>
  </div>
);

export const NoResultsState: React.FC = () => (
  <div className="state-container no-results">
    <p>No search result found!</p>
  </div>
);
