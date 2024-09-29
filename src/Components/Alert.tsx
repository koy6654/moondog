import React, { useEffect, useState } from 'react';

export interface AlertProps {
  type: 'success' | 'warning' | 'error' | null;
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible || !type) return null;

  const alertStyles = {
    success: 'bg-green-100 border border-green-400 text-green-700',
    warning: 'bg-yellow-100 border border-yellow-400 text-yellow-700',
    error: 'bg-red-100 border border-red-400 text-red-700',
  };

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 mb-4 rounded shadow-md ${alertStyles[type]} transition-opacity duration-300`}
    >
      <div className="flex items-center">
        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          {type === 'success' && (
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9V5a1 1 0 112 0v4a1 1 0 01-2 0zm0 4v-1a1 1 0 012 0v1a1 1 0 01-2 0z"
              clipRule="evenodd"
            />
          )}
          {type === 'warning' && (
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 00-.866.5L1.5 17a1 1 0 001.732 1l7.5-12a1 1 0 00-.732-1.5z"
              clipRule="evenodd"
            />
          )}
          {type === 'error' && (
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 00-.866.5L1.5 17a1 1 0 001.732 1l7.5-12a1 1 0 00-.732-1.5z"
              clipRule="evenodd"
            />
          )}
        </svg>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default Alert;
