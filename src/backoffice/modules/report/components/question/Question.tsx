import React from 'react';
import QuestionView from './Question.view';
import { IQuestionProps } from './question.type';
import { QuestionData } from './question.data';

const Question: React.FC<IQuestionProps> = () => {
  const questions = QuestionData;

  return (
    <QuestionView questions={questions} />
  );
};

export default Question;
