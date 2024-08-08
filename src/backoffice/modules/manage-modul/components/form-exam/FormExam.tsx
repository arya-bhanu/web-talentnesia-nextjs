'use client';
import React, { useState } from 'react';
import FormExamView from './FormExam.view';
import { IFormExam } from './formExam.type';

const FormExam: React.FC<IFormExam & { className?: string }> = ({
  className,
}) => {
  const [time, setTime] = useState(new Date());
  return <FormExamView className={className} setTime={setTime} time={time} />;
};

export default FormExam;
