import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';
import { ToastContext } from '../ToastProvider/ToastProvider';

import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ selectedVariant, id, children }) {
  const Icon = ICONS_BY_VARIANT[selectedVariant];

  const { dismissToast } = React.useContext(ToastContext);

  return (
    <div className={`${styles.toast} ${styles[selectedVariant]}`}>
      <div className={styles.iconContainer}>
        <Icon />
      </div>
      <p className={styles.content}>{children}</p>
      <button
        className={styles.closeButton}
        onClick={() => {
          dismissToast(id);
        }}>
        <X size={24} />
        <VisuallyHidden>Dismiss message</VisuallyHidden>
      </button>
    </div>
  );
}

export default Toast;
