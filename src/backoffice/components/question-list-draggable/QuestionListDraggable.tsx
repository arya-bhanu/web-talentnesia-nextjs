'use client';
import React, { useState } from 'react';
import QuestionListDraggableView from './QuestionListDraggable.view';
import { IQuestionListDraggable } from './questionListDraggable.type';
import { useQuestionExamStore } from '@/lib/store';
import { uuid } from 'uuidv4';

const QuestionListDraggable: React.FC<
  Pick<IQuestionListDraggable, 'questionType' | 'id' | 'options'>
> = ({ questionType, id, options }) => {
  
  const { updateQuestion, question } = useQuestionExamStore();
  const [openPopover, setOpenPopover] = useState(false);

  const handleChangeTextQuestion = (text: string, id: string) => {
    const old = [...question];
    const newMapped = old.map((el) => {
      if (el.id === id) {
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

  const handleDeleteList = (id: string) => {
    const old = [...question];
    const filtered = old.filter((el) => el.id !== id);
    updateQuestion(filtered);
  };

  const handleDuplicateItem = (id: string) => {
    const old = [...question];
    const index = old.findIndex((el) => el.id === id);
    if (index || typeof index === 'number') {
      const { id, ...rest } = old[index];
      old.splice(index + 1, 0, { id: uuid().toString(), ...rest });
    }
    updateQuestion(old);
    setOpenPopover(false);
  };

  const handleChangeType = (
    id: string,
    newType: 'radio' | 'textarea' | 'file',
  ) => {
    const old = [...question];
    const newMapped = old.map((el) => {
      if (el.id === id) {
        const { type, options, ...rest } = el;
        const newData = {
          type: newType,
          options: type === 'radio' ? el.options : null,
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
      handleChangeTextQuestion={handleChangeTextQuestion}
      handleDeleteList={handleDeleteList}
      handleDuplicateItem={handleDuplicateItem}
      handleChangeType={handleChangeType}
      id={id}
      openPopover={openPopover}
      setOpenPopover={setOpenPopover}
      questionType={questionType}
      options={options}
    />
  );
};

export default QuestionListDraggable;
