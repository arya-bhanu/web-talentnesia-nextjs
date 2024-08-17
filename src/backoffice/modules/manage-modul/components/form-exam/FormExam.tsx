'use client';
import React, { FormEvent, useState } from 'react';
import FormExamView from './FormExam.view';
import { IFormExam } from './formExam.type';
import { useSearchParams } from 'next/navigation';

const timeDate = new Date();
timeDate.setHours(1);
timeDate.setMinutes(0);

const FormExam: React.FC<IFormExam & { className?: string }> = ({
  className,
}) => {
  const params = useSearchParams();

  const [time, setTime] = useState(timeDate);

  const handleSubmitExam = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return <FormExamView className={className} setTime={setTime} time={time} />;
};

export default FormExam;
