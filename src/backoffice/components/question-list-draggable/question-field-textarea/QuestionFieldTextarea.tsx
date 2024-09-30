import React from 'react';
import QuestionFieldTextareaView from './QuestionFieldTextarea.view';
import { useQuestionExamStore } from '@/backoffice/modules/manage-modul/add-exam/store';

const QuestionFieldTextarea: React.FC<{ id: string }> = ({ id }) => {
  const { question, updateQuestion } = useQuestionExamStore();

  const handleBodyChange = (newBody: string) => {
    const updatedQuestions = question.map(q => 
      q.id === id ? { ...q, body: newBody } : q
    );
    updateQuestion(updatedQuestions);
  };

  const currentQuestion = question.find(q => q.id === id);

  return <QuestionFieldTextareaView 
    body={currentQuestion?.body || ''}
    onBodyChange={handleBodyChange}
  />;
};

export default QuestionFieldTextarea;
