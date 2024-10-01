import React from 'react';
import QuestionFieldProjectView from './QuestionFieldProject.view';
import { useQuestionExamStore } from '@/backoffice/modules/manage-modul/add-exam/store';
import { uploadFile } from '@/backoffice/modules/school/api/minioApi';

const QuestionFieldProject: React.FC<{ id: string }> = ({ id }) => {
  const { question, updateQuestion } = useQuestionExamStore();

  const handleFileUpload = async (file: File) => {
    try {
      const response = await uploadFile(file, 'content');
      let fileUrl: string;
      if (typeof response.path === 'string') {
        fileUrl = response.path;
      } else if (
        typeof response.path === 'object' &&
        'thumbs' in response.path
      ) {
        if (typeof response.path.thumbs === 'string') {
          fileUrl = response.path.thumbs;
        } else {
          throw new Error('Invalid response format');
        }
      } else {
        throw new Error('Unexpected response format');
      }

      const updatedQuestions = question.map((q) =>
        q.id === id ? { ...q, body: fileUrl } : q,
      );
      updateQuestion(updatedQuestions);
    } catch (error) {
      console.error('Failed to upload file:', error);
    }
  };

  const currentQuestion = question.find((q) => q.id === id);

  return (
    <QuestionFieldProjectView
      body={currentQuestion?.body || ''}
      onFileUpload={handleFileUpload}
    />
  );
};

export default QuestionFieldProject;
