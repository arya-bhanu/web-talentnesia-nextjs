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
      let fileName: string;
      let fileType: string = file.type;
  
      if (fileType.startsWith('image/')) {
        if (typeof response.path === 'object' && 'thumbs' in response.path) {
          fileUrl = response.path.thumbs;
        } else {
          throw new Error('Invalid response format for image');
        }
      } else {
        if (typeof response.path === 'string') {
          fileUrl = response.path;
        } else {
          throw new Error('Invalid response format for non-image file');
        }
      }
  
      fileName = response.fileOrigin;
  
      const updatedQuestions = question.map((q) =>
        q.id === id ? { ...q, body: fileUrl, fileName, fileType } : q
      );
      updateQuestion(updatedQuestions);
    } catch (error) {
      console.error('Failed to upload file:', error);
    }
  };
  

  const currentQuestion = question.find((q) => q.id === id);

  return (
    <QuestionFieldProjectView
      fileName={currentQuestion?.fileName || ''}
      body={currentQuestion?.body || ''}
      onFileUpload={handleFileUpload}
    />
  );
};

export default QuestionFieldProject;
