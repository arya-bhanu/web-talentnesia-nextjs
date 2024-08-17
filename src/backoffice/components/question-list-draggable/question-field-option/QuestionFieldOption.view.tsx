import { Label } from 'flowbite-react/components/Label';
import { Radio } from 'flowbite-react/components/Radio';
import React from 'react';
import Add from '@/../public/icons/add-sm.svg';

const QuestionFieldOptionView: React.FC<{
  questions: { text: string; value: string }[];
}> = (props) => {
  return (
    <div className="flex flex-col gap-3">
      {props.questions.map((el, index) => {
        return (
          <div key={el.text + index} className="flex items-center gap-3">
            <Radio id={el.value + index} name="option" value={el.value} />
            <Label className="font-lato text-sm font-normal" htmlFor="1">
              {el.text}
            </Label>
          </div>
        );
      })}

      <button
        type="button"
        className="flex text-sm font-lato font-medium items-center gap-1"
      >
        <Add />
        <span>Add New Option</span>
      </button>
    </div>
  );
};

export default QuestionFieldOptionView;
