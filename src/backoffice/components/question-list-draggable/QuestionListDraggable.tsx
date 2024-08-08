'use client';
import React, { useState } from 'react';
import QuestionListDraggableView from './QuestionListDraggable.view';
import { QuestionType } from './questionListDraggable.enum';

const QuestionListDraggable = () => {
  const [openPopover, setOpenPopover] = useState(false);
  const [questionType, setQuestionType] = useState(
    QuestionType.MultipleChoice.value,
  );
  return (
    <QuestionListDraggableView
      openPopover={openPopover}
      setOpenPopover={setOpenPopover}
      questionType={questionType}
      setQuestionType={setQuestionType}
    />
  );
};

export default QuestionListDraggable;
