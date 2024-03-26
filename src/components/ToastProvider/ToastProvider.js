import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        setToasts([]);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function dismissToast(id) {
    // Filter out the toast
    const updatedToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(updatedToasts);
  }

  function createToast(message, variant) {
    // Create a new array with current toasts plus new toast
    const newToasts = [
      ...toasts,
      { message, variant, id: crypto.randomUUID() },
    ];

    // Update state to new array with all toasts
    setToasts(newToasts);
  }

  return (
    <ToastContext.Provider
      value={{ toasts, dismissToast, createToast }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
