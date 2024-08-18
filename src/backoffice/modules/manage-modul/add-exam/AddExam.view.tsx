import React from 'react';
import FormExam from '../components/form-exam';

const AddExamView: React.FC<{ chapterId?: string | null }> = ({
  chapterId,
}) => {
  return (
    <section>
      <h1 className="font-poppins font-semibold text-lg">
        {chapterId ? 'Edit Exam' : 'Add Exam'}
      </h1>
      <FormExam className="mt-5" chapterId={chapterId} />
    </section>
  );
};

export default AddExamView;
