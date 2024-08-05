import React from 'react';
import AlertModalView from './AlertModal.view';
import { IAlertModal } from './alertModal.type';

const AlertModal: React.FC<IAlertModal> = (props) => {
  return <AlertModalView {...props} />;
};

export default AlertModal;
