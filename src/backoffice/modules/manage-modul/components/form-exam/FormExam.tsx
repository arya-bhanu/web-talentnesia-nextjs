'use client';
import React, { useState } from 'react';
import FormExamView from './FormExam.view';
import { IFormExam } from './formExam.type';
const timeDate = new Date();
timeDate.setHours(1);
timeDate.setMinutes(0);
const FormExam: React.FC<IFormExam & { className?: string }> = ({
  className,
}) => {
  const [question, setQuestion] = useState([]);
  const [time, setTime] = useState(timeDate);
  return <FormExamView className={className} setTime={setTime} time={time} />;
};

export default FormExam;
