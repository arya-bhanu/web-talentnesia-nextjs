"use client"
import AddExam from '@/backoffice/modules/manage-modul/add-exam';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

const AddExamIndex = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <SuspenseAddExamIndex />
    </Suspense>
  );
};

const SuspenseAddExamIndex = () => {
  const params = useSearchParams();
  const chapterId = params.get('chapterId');
  return <AddExam chapterId={chapterId} />;
};

export default AddExamIndex;
