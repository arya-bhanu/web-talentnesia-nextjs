import React from 'react';
import TimeInputView from './TImeInput.view';
import { ITimeInput } from './timeInput.type';

const TimeInput: React.FC<ITimeInput & { className?: string }> = (props) => {
  return <TimeInputView {...props} className={props.className} />;
};

export default TimeInput;
