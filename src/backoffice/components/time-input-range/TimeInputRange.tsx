import React from 'react';
import TimeInputRangeView from './TimeInputRange.view';
import { ITimeInputRange } from './timeInputRange.type';

const TimeInputRange: React.FC<ITimeInputRange> = (props) => {
  return <TimeInputRangeView {...props} />;
};

export default TimeInputRange;
