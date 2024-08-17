import React, { useCallback } from 'react';
import DragIndicator from '@/../public/icons/drag_indicator.svg';
import LabelForm from '../label-form';
import MoreHoriz from '@/../public/icons/more_horiz.svg';
import { Select } from 'flowbite-react';
import './questionListDragganle.css';
import QuestionFieldOption from './question-field-option';
import QuestionFieldTextarea from './question-field-textarea';
import Copy from '@/../public/icons/copy.svg';
import TrashSm from '@/../public/icons/trash-sm.svg';
import PopoverAction from '../popover-action';
import { IQuestionListDraggable } from './questionListDraggable.type';
import QuestionFieldProject from './question-field-project';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const QuestionListDraggableView: React.FC<
  IQuestionListDraggable & {
    handleChangeType: (
      keyId: string,
      newType: 'radio' | 'textarea' | 'file',
    ) => void;
  }
> = ({
  openPopover,
  setOpenPopover,
  questionType,
  keyId,
  handleChangeType,
  options,
}) => {
  const renderFieldOption = useCallback(
    (questions?: { text: string; value: string }[]) => {
      switch (questionType.type) {
        case 'textarea':
          return <QuestionFieldTextarea />;
        case 'file':
          return <QuestionFieldProject />;
        default:
          
          if (questions) {
            return <QuestionFieldOption questionOptions={questions} />;
          }
          return <></>;
      }
    },
    [questionType],
  );
  return (
    <div className={clsx('flex items-start gap-5')}>
      <button>
        <DragIndicator />
      </button>
      <div className="flex-[2]">
        <div id="richtext" className={clsx('flex flex-col gap-1')}>
          <LabelForm htmlFor="question" isImportant className="w-fit">
            Question
          </LabelForm>
          <ReactQuill />
        </div>
        <div className="mt-5">{renderFieldOption(options)}</div>
      </div>
      <div className="flex-1 flex items-center gap-3">
        <div className="flex flex-col w-full gap-1">
          <LabelForm isImportant htmlFor="type" className="w-fit">
            Type
          </LabelForm>
          <div className="flex items-center gap-3 w-full">
            <Select
              id="type"
              className="w-full max-w-none"
              onChange={(e) => {
                handleChangeType(
                  keyId,
                  e.target.value as 'radio' | 'textarea' | 'file',
                );
              }}
              defaultValue={questionType.type}
            >
              <option value="textarea">Essay</option>
              <option value="file">Mini Project</option>
              <option value="radio">Multiple Choice</option>
            </Select>
            <PopoverAction
              openPopover={openPopover}
              setOpenPopover={setOpenPopover}
              content={
                <ul className="p-3 flex flex-col gap-3 w-36">
                  <li>
                    <button className="flex items-center gap-2 font-lato text-sm">
                      <Copy />
                      <span>Duplicate</span>
                    </button>
                  </li>
                  <li>
                    <button className="flex items-center gap-2 font-lato text-sm">
                      <TrashSm />
                      <span>Delete</span>
                    </button>
                  </li>
                </ul>
              }
              button={
                <button type="button">
                  <MoreHoriz />
                </button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionListDraggableView;
