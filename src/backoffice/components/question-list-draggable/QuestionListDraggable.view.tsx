import React from 'react';
import DragIndicator from '@/../public/icons/drag_indicator.svg';
import LabelForm from '../label-form';
import MoreHoriz from '@/../public/icons/more_horiz.svg';
import { Label, Radio, Select, TextInput } from 'flowbite-react';
import Add from '@/../public/icons/add-sm.svg';
import QuestionFieldOption from './question-field-option';
import QuestionFieldTextarea from './question-field-textarea';
const QuestionListDraggableView = () => {
  return (
    <div className="flex items-start gap-5">
      <button>
        <DragIndicator />
      </button>
      <div className="flex-[2]">
        <div className="flex flex-col gap-1">
          <LabelForm htmlFor="question" isImportant className="w-fit">
            Question
          </LabelForm>
          <TextInput id="question" />
        </div>
        <div className="mt-5">
          {/* <QuestionFieldOption /> */}
          <QuestionFieldTextarea />
        </div>
      </div>
      <div className="flex-1 flex items-center gap-3">
        <div className="flex flex-col w-full gap-1">
          <LabelForm isImportant htmlFor="type" className="w-fit">
            Type
          </LabelForm>
          <div className="flex items-center gap-3 w-full">
            <Select id="type" className="w-full max-w-none">
              <option value="multiple_choice">Multiple Choice</option>
              <option value="essay">Essay</option>
              <option value="mini_project">Mini Project</option>
            </Select>
            <button type="button">
              <MoreHoriz />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionListDraggableView;
