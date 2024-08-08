import { Label } from 'flowbite-react/components/Label';
import { Radio } from 'flowbite-react/components/Radio';
import React from 'react';
import Add from '@/../public/icons/add-sm.svg';

const QuestionFieldOptionView = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Radio id={'1'} name="option" value={'1'} />
        <Label className="font-lato text-sm font-normal" htmlFor="1">
          Option 1
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <Radio id={'2'} name="option" value={'2'} />
        <Label className="font-lato text-sm font-normal" htmlFor="2">
          Option 2
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <Radio id={'3'} name="option" value={'3'} />
        <Label className="font-lato text-sm font-normal" htmlFor="3">
          Option 3
        </Label>
      </div>
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
