import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ message, selectedVariant, setShowToast }) {
  return (
    <div className={`${styles.toast} ${styles[selectedVariant]}`}>
      <div className={styles.iconContainer}>
        {selectedVariant === 'success' ? <CheckCircle /> : ''}
        {selectedVariant === 'notice' ? <Info /> : ''}
        {selectedVariant === 'warning' ? <AlertTriangle /> : ''}
        {selectedVariant === 'error' ? <AlertOctagon /> : ''}
      </div>
      <p className={styles.content}>{message}</p>
      <button
        className={styles.closeButton}
        onClick={() => {
          setShowToast(false);
        }}>
        <X size={24} />
        <VisuallyHidden>Dismiss message</VisuallyHidden>
      </button>
    </div>
  );
}

export default Toast;
