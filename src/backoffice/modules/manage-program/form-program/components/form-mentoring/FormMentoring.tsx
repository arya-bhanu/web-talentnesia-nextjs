import React, { useState } from 'react';
import FormMentoringView from './FormMentoring.view';

const time = new Date();
time.setHours(1);
time.setMinutes(0);
const FormMentoring = () => {
  const [timeIn, setTimeIn] = useState(time);
  return (
    <FormMentoringView
      timeInputState={{
        setTime: setTimeIn,
        time: timeIn,
      }}
    />
  );
};

export default FormMentoring;
