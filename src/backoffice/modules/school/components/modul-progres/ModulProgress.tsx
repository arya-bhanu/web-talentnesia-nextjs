import React from 'react';
import ModulProgressView from './ModulProgress.view';
import { IModulProgress } from './modulProgress.type';

const ModulProgress: React.FC<IModulProgress> = (props) => {
  return <ModulProgressView {...props} />;
};

export default ModulProgress;
