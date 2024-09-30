import { Label } from 'flowbite-react/components/Label';
import { Radio } from 'flowbite-react/components/Radio';
import React from 'react';
import Add from '@/../public/icons/add-sm.svg';

const QuestionFieldOptionView: React.FC<{
  questions: {
    text: string;
    value: string;
    id: string;
    isCorrect: '0' | '1';
  }[];
  handleAddNewOption: () => void;
  handleChangeOption: (text: string, id: string) => void;
  handleRadioClick: (id: string) => void;
  keyId: string;
}> = (props) => {
  return (
    <div className="flex flex-col gap-3">
      {props.questions.map((el, index) => {
          console.log(`Question ${props.keyId} - Option ${index + 1} (ID: ${el.id}):`, {
            text: el.text,
            value: el.value,
            isCorrect: el.isCorrect,
            checked: el.isCorrect === '1'
          });
        return (
          <div key={el.id} className="flex items-center gap-1.5 w-full">
            <Radio
              key={`${props.keyId}_${el.id}`}
              id={`${el.value}_${index}`}
              name={`option_${props.keyId}`}
              value={el.value}
              onChange={() => props.handleRadioClick(el.id)}
              checked={String(el.isCorrect) === '1'}
            />

            <Label
              className="font-lato text-sm font-normal"
              htmlFor={el.value + index}
            >
              <input
                onBlur={(elInput) =>
                  props.handleChangeOption(elInput.target.value, el.id)
                }
                type="text"
                defaultValue={el.text}
                key={el.id}
                className="p-0 border-b border-t-0 border-x-0 w-[200%] focus:ring-transparent focus:ring-offset-transparent"
              />
            </Label>
          </div>
        );
      })}

      <button
        onClick={props.handleAddNewOption}
        type="button"
        className="flex text-sm font-lato font-medium items-center gap-1 w-fit"
      >
        <Add />
        <span>Add New Option</span>
      </button>
    </div>
  );
};

export default QuestionFieldOptionView;
