import { useEffect } from 'react';
import styles from './AddNotice.module.css';

export default function AddNotice({ notice, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [notice, onDismiss]);
  return <div role="status" className={styles.notice}><span uk-icon="cart" aria-hidden="true" />{notice.message}<button type="button" onClick={onDismiss} aria-label="Cerrar aviso" title="Cerrar"><span uk-icon="close" /></button></div>;
}
