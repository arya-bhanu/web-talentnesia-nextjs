'use client';
import React from 'react';
import FormExam from '../form-exam';
import { useSearchParams } from 'next/navigation';

const AddExamView: React.FC<{}> = ({}) => {
  const params = useSearchParams();
  const examId = params.get('examId');
  return (
    <section>
      <h1 className="font-poppins font-semibold text-lg">
        {examId ? 'Edit Exam' : 'Add Exam'}
      </h1>
      <FormExam className="mt-5" />
    </section>
  );
};

export default AddExamView;
