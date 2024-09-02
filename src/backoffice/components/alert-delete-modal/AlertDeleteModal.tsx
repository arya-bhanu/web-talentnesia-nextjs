import React from 'react';
import AlertDeleteModalView from './AlertDeleteModal.view';
import { IAlertDeleteModal } from './alertDeleteModal.type';

const AlertDeleteModal: React.FC<IAlertDeleteModal> = (props) => {
  return <AlertDeleteModalView {...props} />;
};

export default AlertDeleteModal;
