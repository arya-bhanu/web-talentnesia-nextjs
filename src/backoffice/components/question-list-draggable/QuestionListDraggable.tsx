'use client';
import React, { useState } from 'react';
import QuestionListDraggableView from './QuestionListDraggable.view';
import { IQuestionListDraggable } from './questionListDraggable.type';
import { useQuestionExamStore } from '@/lib/store';
import { uuid } from 'uuidv4';
import { defaultOptionRadio } from '@/backoffice/modules/manage-modul/components/form-exam/formExam.data';

const QuestionListDraggable: React.FC<
  Pick<IQuestionListDraggable, 'questionType' | 'id' | 'options'>
> = ({ questionType, id, options }) => {
  const { updateQuestion, question } = useQuestionExamStore();
  const [openPopover, setOpenPopover] = useState(false);

  const handleChangeTextQuestion = (text: string, id: string) => {
    const old = [...question];
    const newMapped = old.map((el) => {
      if (el.id === id) {
        const { title, ...rest } = el;
        return {
          ...rest,
          title: text,
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
        const defaultOpt = defaultOptionRadio;
        const newData = {
          type: newType,
          options: newType === 'radio' ? defaultOpt : null,
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
