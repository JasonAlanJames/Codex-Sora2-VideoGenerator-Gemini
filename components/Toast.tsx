
import React, { useEffect, useState } from 'react';
import { CheckCircle, X, AlertTriangle } from 'lucide-react';
import { ToastMessage } from '../contexts/ToastContext';

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: number) => void;
}

const toastConfig = {
  success: {
    icon: <CheckCircle className="h-6 w-6 text-green-400" />,
    style: 'bg-green-500',
  },
  error: {
    icon: <AlertTriangle className="h-6 w-6 text-red-400" />,
    style: 'bg-red-500',
  },
};

const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false);

  const config = toastConfig[toast.type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      const exitTimer = setTimeout(() => onDismiss(toast.id), 300);
      return () => clearTimeout(exitTimer);
    }, 4700);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);


  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => onDismiss(toast.id), 300);
  };
  
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`max-w-sm w-full bg-dark-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden transform transition-all duration-300 ${isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">{config.icon}</div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-white">{toast.message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={handleDismiss}
              className="bg-dark-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-800 focus:ring-brand-primary"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
