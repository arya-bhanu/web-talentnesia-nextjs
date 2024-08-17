'use client';
import React, { useState } from 'react';
import QuestionListDraggableView from './QuestionListDraggable.view';
import { IQuestionListDraggable } from './questionListDraggable.type';
import { useQuestionExamStore } from '@/lib/store';

const QuestionListDraggable: React.FC<
  Pick<IQuestionListDraggable, 'questionType' | 'keyId' | 'options'>
> = ({ questionType, keyId, options }) => {
  const { updateQuestion, question } = useQuestionExamStore();
  const [openPopover, setOpenPopover] = useState(false);
  const handleChangeType = (
    keyId: string,
    newType: 'radio' | 'textarea' | 'file',
  ) => {
    const old = [...question];

    const newMapped = old.map((el) => {
      if (el.keyId === keyId) {
        const { type, ...rest } = el;
        const newData = {
          type: newType,
          ...rest,
        };
        return newData;
      } else {
        return el;
      }
    });
    updateQuestion(newMapped);
  };
  return (
    <QuestionListDraggableView
      handleChangeType={handleChangeType}
      keyId={keyId}
      openPopover={openPopover}
      setOpenPopover={setOpenPopover}
      questionType={questionType}
      options={options}
    />
  );
};

export default QuestionListDraggable;
