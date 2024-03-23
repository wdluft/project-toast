import React from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';
import Toast from '../Toast/Toast';
import ToastShelf from '../ToastShelf/ToastShelf';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [selectedVariant, setSelectedVariant] = React.useState(
    VARIANT_OPTIONS[0]
  );
  const [message, setMessage] = React.useState('');
  const [toasts, setToasts] = React.useState([]);

  function handleDismiss(id) {
    // Filter out the toast
    const updatedToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(updatedToasts);
  }

  function handleNewToast(event) {
    event.preventDefault();

    // Create a new toast object
    const newToast = {
      message,
      selectedVariant,
      id: crypto.randomUUID(),
    };

    // Create a new array with current toasts plus new toast
    const newToasts = [...toasts, newToast];

    // Update state to new array with all toasts
    setToasts(newToasts);

    // Reset form inputs
    setSelectedVariant(VARIANT_OPTIONS[0]);
    setMessage('');
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt='Cute toast mascot' src='/toast.png' />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} handleDismiss={handleDismiss} />

      <form className={styles.controlsWrapper} onSubmit={handleNewToast}>
        <div className={styles.row}>
          <label
            htmlFor='message'
            className={styles.label}
            style={{ alignSelf: 'baseline' }}>
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id='message'
              className={styles.messageInput}
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              required
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => {
              return (
                <label htmlFor={`variant-${option}`} key={option}>
                  <input
                    id={`variant-${option}`}
                    type='radio'
                    name='variant'
                    value={option}
                    checked={selectedVariant === option}
                    onChange={(event) => {
                      setSelectedVariant(event.target.value);
                    }}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
