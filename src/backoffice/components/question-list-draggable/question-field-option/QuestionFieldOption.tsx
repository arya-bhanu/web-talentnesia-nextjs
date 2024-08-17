import React from 'react';
import QuestionFieldOptionView from './QuestionFieldOption.view';

const QuestionFieldOption: React.FC<{
  questionOptions: { text: string; value: string }[];
}> = (props) => {
  return <QuestionFieldOptionView questions={props.questionOptions} />;
};

export default QuestionFieldOption;
