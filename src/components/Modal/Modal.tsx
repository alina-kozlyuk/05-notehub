import { useEffect } from 'react';
import css from './Modal.module.css'
import { createPortal } from 'react-dom';

interface ModalProps{
    children: React.ReactNode;
    onClose: () => void;
}

export default function Modal({children, onClose}: ModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        }
    }, [onClose])
    
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return createPortal(
        <div
          className={css.backdrop}
          role="dialog"
          aria-modal="true"
          onClick={handleBackdropClick}  
>
          <div className={css.modal}>
             {children}
          </div>
        </div>,
        document.body
    );
}