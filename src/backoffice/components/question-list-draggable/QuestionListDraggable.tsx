'use client';
import React, { useState } from 'react';
import QuestionListDraggableView from './QuestionListDraggable.view';
import { IQuestionListDraggable } from './questionListDraggable.type';
import { useQuestionExamStore } from '@/lib/store';
import { uuid } from 'uuidv4';

const QuestionListDraggable: React.FC<
  Pick<IQuestionListDraggable, 'questionType' | 'keyId' | 'options'>
> = ({ questionType, keyId, options }) => {
  const { updateQuestion, question } = useQuestionExamStore();
  const [openPopover, setOpenPopover] = useState(false);

  const handleChangeTextQuestion = (text: string, keyId: string) => {
    const old = [...question];
    const newMapped = old.map((el) => {
      if (el.keyId === keyId) {
        const { question, ...rest } = el;
        return {
          ...rest,
          question: text,
        };
      } else {
        return el;
      }
    });
    updateQuestion(newMapped);
  };

  const handleDeleteList = (keyId: string) => {
    const old = [...question];
    const filtered = old.filter((el) => el.keyId !== keyId);
    updateQuestion(filtered);
  };

  const handleDuplicateItem = (keyId: string) => {
    const old = [...question];
    const index = old.findIndex((el) => el.keyId === keyId);
    if (index || typeof index === 'number') {
      const { keyId, ...rest } = old[index];
      old.splice(index + 1, 0, { keyId: uuid().toString(), ...rest });
    }
    updateQuestion(old);
    setOpenPopover(false);
  };

  const handleChangeType = (
    keyId: string,
    newType: 'radio' | 'textarea' | 'file',
  ) => {
    const old = [...question];
    const newMapped = old.map((el) => {
      if (el.keyId === keyId) {
        const { type, options, ...rest } = el;
        const newData = {
          type: newType,
          options: type === 'radio' ? el.options : null,
          ...rest,
        };
        console.log(newData)
        return newData;
      } else {
        return el;
      }
    });
    updateQuestion(newMapped);
  };

  return (
    <QuestionListDraggableView
      handleChangeTextQuestion={handleChangeTextQuestion}
      handleDeleteList={handleDeleteList}
      handleDuplicateItem={handleDuplicateItem}
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
