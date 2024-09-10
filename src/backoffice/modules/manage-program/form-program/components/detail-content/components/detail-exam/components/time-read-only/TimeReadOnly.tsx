import React from 'react';
import { TimeReadOnlyProps } from './timeReadOnly.type';
import TimeReadOnlyView from './TimeReadOnly.view';

const TimeReadOnly: React.FC<TimeReadOnlyProps> = (props) => {
  return <TimeReadOnlyView {...props} className={props.className} />;
};

export default TimeReadOnly;
