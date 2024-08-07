import React from 'react';
import LabelFormView from './LabelForm.view';
import { LabelViewProps } from './label.type';

const LabelForm: React.FC<LabelViewProps> = ({ ...rest }) => {
  return <LabelFormView {...rest}>{rest.children}</LabelFormView>;
};

export default LabelForm;
