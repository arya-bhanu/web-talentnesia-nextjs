import React from 'react';
import QuestionFieldOptionView from './QuestionFieldOption.view';
import { useQuestionExamStore } from '@/lib/store';
import { uuid } from 'uuidv4';
import debounce from 'lodash.debounce';
import { createOptionId } from './questionFieldOption.helper';

const QuestionFieldOption: React.FC<{
  questionOptions: { text: string; value: string; keyOption: string }[];
  keyId: string;
}> = (props) => {
  const { question, updateQuestion } = useQuestionExamStore();

  const handleAddNewOption = () => {
    const old = [...question];
    const newMapped = old.map((el) => {
      if (el.keyId === props.keyId) {
        const { options, ...rest } = el;
        if (options) {
          const oldOption = [...options];
          oldOption.push({
            text: 'Option',
            value: `option_${new Date().getTime()}`,
            keyOption: uuid().toString(),
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

  const debouncedHandleChangeOption = debounce(
    (newText: string, keyOption: string) => {
      const old = [...question];
      const index = old.findIndex((el) => el.keyId === props.keyId);
      if (index !== -1) {
        const item = old[index];
        const options = item.options;
        if (options && Array.isArray(options)) {
          const optionIndex = options.findIndex(
            (elOption) => elOption.keyOption === keyOption,
          );
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
    },
    700,
  );

  return (
    <QuestionFieldOptionView
      handleChangeOption={debouncedHandleChangeOption}
      handleAddNewOption={handleAddNewOption}
      questions={props.questionOptions}
      keyId={props.keyId}
    />
  );
};

export default QuestionFieldOption;
