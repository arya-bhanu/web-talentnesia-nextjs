import React from 'react';
import ModalView from './Modal.view';
import { IModal } from './modal.type';

const Modal: React.FC<IModal> = (props) => {
  return <ModalView {...props}>{props.children}</ModalView>;
};

export default Modal;
