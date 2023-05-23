import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalUI, ModalUIProps } from './modal-ui';

const MODAL_ROOT = 'modal-root';

const createModalRoot = () => {
  const root = document.createElement('div');
  root.id = MODAL_ROOT;

  document.body.appendChild(root);

  return root;
};

export type ModalProps = {
  isOpen: boolean;
} & ModalUIProps;

// Since the first implementation is meant to be used only in mobile
// devices, we won't be adding any keyboard handling. However,
// we need at least focus trap and esc handling for accessibility.
export const Modal = ({ isOpen, onClose, ...props }: ModalProps) => {
  const modalRoot = useRef<HTMLElement | null>(null);

  // When `isOpen` is true on initial mount the modal root doesn't exist,
  // resulting in an empty render. To avoid this we manually trigger a single
  // rerender after mounting.
  const [hasPendingRerender, setHasPendingRerender] = useState(
    () => isOpen && modalRoot.current === null,
  );

  useEffect(() => {
    const root = document.getElementById(MODAL_ROOT) || createModalRoot();
    modalRoot.current = root;
  }, []);

  useEffect(() => {
    if (hasPendingRerender) {
      setHasPendingRerender(false);
    }
  }, [hasPendingRerender]);

  useEffect(() => {
    const overflow = isOpen ? 'hidden' : 'initial';
    document.body.style.overflow = overflow;
  }, [isOpen]);

  return isOpen && modalRoot.current !== null
    ? createPortal(<ModalUI onClose={onClose} {...props} />, modalRoot.current)
    : null;
};
