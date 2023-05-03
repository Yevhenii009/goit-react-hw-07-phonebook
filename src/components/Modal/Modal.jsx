import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ children, modalShoudClose }) => {
  useEffect(() => {
    const handleKeyDown = elem => {
      if (elem.code === 'Escape') {
        modalShoudClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalShoudClose]);

  const handleBackdropClick = elem => {
    if (elem.currentTarget === elem.target) {
      modalShoudClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  modalShoudClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};