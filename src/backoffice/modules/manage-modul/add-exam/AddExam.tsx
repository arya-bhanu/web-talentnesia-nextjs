'use client';
import React from 'react';
import AddExamView from './AddExam.view';

const AddExam: React.FC<{ chapterId?: string | null }> = ({ chapterId }) => {
  return <AddExamView chapterId={chapterId} />;
};

export default AddExam;
