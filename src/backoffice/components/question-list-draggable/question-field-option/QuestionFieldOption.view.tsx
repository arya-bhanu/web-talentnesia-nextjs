import { Label } from 'flowbite-react/components/Label';
import { Radio } from 'flowbite-react/components/Radio';
import React from 'react';
import Add from '@/../public/icons/add-sm.svg';

const QuestionFieldOptionView: React.FC<{
  questions: { text: string; value: string; id: string }[];
  handleAddNewOption: () => void;
  handleChangeOption: (text: string, id: string) => void;
  keyId: string;
}> = (props) => {
  return (
    <div className="flex flex-col gap-3">
      {props.questions.map((el, index) => {
        return (
          <div key={el.text + index} className="flex items-center gap-1.5">
            <Radio id={el.value + index} name="option" value={el.value} />
            <Label
              className="font-lato text-sm font-normal"
              htmlFor={el.value + index}
            >
              <input
                onChange={(elInput) =>
                  props.handleChangeOption(elInput.target.value, el.id)
                }
                type="text"
                defaultValue={el.text}
                key={el.id}
                className="p-0 border-b border-t-0 border-x-0 focus:ring-transparent focus:ring-offset-transparent"
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
