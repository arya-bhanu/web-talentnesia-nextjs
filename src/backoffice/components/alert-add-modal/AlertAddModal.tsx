import React from 'react';
import AlertAddModalView from './AlertAddModal.view';
import { IAlertAddModal } from './alertAddModal.type';

const AlertAddModal: React.FC<IAlertAddModal> = (props) => {
  return <AlertAddModalView {...props} />;
};

export default AlertAddModal;
