import React from 'react';
import AlertEditModalView from './AlerEditModal.view';
import { IAlertEditModal } from './alertEditModal.type';

const AlertEditModal: React.FC<IAlertEditModal> = (props) => {
  return <AlertEditModalView {...props} />;
};

export default AlertEditModal;
