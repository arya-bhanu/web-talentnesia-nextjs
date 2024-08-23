import React, { useState } from 'react';
import FormScheduleView from './FormSchedule.view';

const FormSchedule = () => {
  const [time, setTime] = useState(new Date());
  return <FormScheduleView timeInputState={{ setTime, time }} />;
};

export default FormSchedule;
