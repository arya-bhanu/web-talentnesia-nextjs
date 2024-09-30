import React from 'react';
import QuestionFieldOptionView from './QuestionFieldOption.view';
import { useQuestionExamStore } from '../../../../add-exam/store';
import { uuid } from 'uuidv4';
import { createOptionId } from './questionFieldOption.helper';

const QuestionFieldOption: React.FC<{
  questionOptions: { text: string; value: string; id: string }[];
  id: string;
}> = (props) => {
  const { question, updateQuestion } = useQuestionExamStore();

  const handleAddNewOption = () => {
    const old = [...question];
    const newMapped = old.map((el) => {
      if (el.id === props.id) {
        const { options, ...rest } = el;
        if (options) {
          const oldOption = [...options];
          oldOption.push({
            text: 'Option',
            value: `option_${new Date().getTime()}`,
            id: uuid().toString(),
            isCorrect: '0' as '0' | '1',
          });
          const newData = {
            ...rest,
            options: oldOption,
          };
          return newData;
        }
        return el;
      } else {
        return el;
      }
    });
    updateQuestion(newMapped);
  };

  const handleChangeOptionText = (newText: string, id: string) => {
    const old = [...question];
    const index = old.findIndex((el) => el.id === props.id);
    if (index !== -1) {
      const item = old[index];
      const options = item.options;
      if (options && Array.isArray(options)) {
        const optionIndex = options.findIndex((elOption) => elOption.id === id);
        if (optionIndex !== -1) {
          const newOptions = [...options];
          const { text, value, ...rest } = newOptions[optionIndex];
          newOptions[optionIndex] = {
            ...rest,
            text: newText,
            value: createOptionId(newText),
          };
          const newItem = { ...item, options: newOptions };
          const newQuestion = [
            ...old.slice(0, index),
            newItem,
            ...old.slice(index + 1),
          ];
          updateQuestion(newQuestion);
        }
      }
    }
  };

  return (
    <QuestionFieldOptionView
      handleChangeOption={handleChangeOptionText}
      handleAddNewOption={handleAddNewOption}
      questions={props.questionOptions}
      keyId={props.id}
    />
  );
};

export default QuestionFieldOption;
