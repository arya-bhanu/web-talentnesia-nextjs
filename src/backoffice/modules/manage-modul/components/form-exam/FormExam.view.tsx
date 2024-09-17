import LabelForm from '@/backoffice/components/label-form';
import { Button, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { IFormExam } from './formExam.type';
import TimeInput from '@/backoffice/components/time-input';
import Add from '@/../public/icons/add.svg';
import QuestionListDraggable from '@/backoffice/components/question-list-draggable';
import { defaultQuestionRadio } from './formExam.data';
import {
  useExamStore,
  useQuestionExamStore,
} from '@/backoffice/modules/manage-modul/add-exam/store';
import { uuid } from 'uuidv4';
import Link from 'next/link';
import { convertStrToTime } from '@/helpers/formatter.helper';
import { useSearchParams } from 'next/navigation';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import PermissionGranted from '@/backoffice/components/permission-granted/PermissionGranted';

const FormExamView: React.FC<
  IFormExam & {
    className?: string;
  }
> = ({ className, handleSubmitExam }) => {
  const params = useSearchParams();
  const examId = params.get('examId');
  const {
    question,
    setNewQuestion: setQuestion,
    sortActionExam,
  } = useQuestionExamStore();
  const { dataExam, setTime } = useExamStore();
  const [timeState, setTimeState] = useState<Date>(
    convertStrToTime(dataExam?.duration || '01.00'),
  );

  useEffect(() => {
    if (timeState) {
      setTime(timeState);
    }
  }, [timeState]);

  const handleAddQuestion = () => {
    const { id, ...rest } = defaultQuestionRadio;
    const createdId = uuid().toString();
    setQuestion({ ...rest, id: createdId });
  };

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      sortActionExam(active, over);
    }
  }

  return (
    <form onSubmit={handleSubmitExam} className={className}>
      <div className="flex gap-5 items-stretch">
        <div className="flex-1">
          <LabelForm isImportant htmlFor="exam_name">
            Exam Name
          </LabelForm>
          <TextInput
            id="exam_name"
            name="exam_name"
            placeholder="UI/UX Designer"
            defaultValue={dataExam?.title}
            key={dataExam?.title}
            required
          />
        </div>
        <div className="flex-1 ">
          <TimeInput
            label={{ isImportant: true, text: 'Duration' }}
            setTime={setTimeState}
            time={convertStrToTime(dataExam?.duration || '01:00')}
            className="h-full"
          />
        </div>
      </div>
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-poppins font-semibold text-sm">Question</h2>
          <PermissionGranted roleable role='manage-module.addQuestion'>
            <button
              type="button"
              onClick={handleAddQuestion}
              className="flex items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5  dark:focus:ring-yellow-900"
            >
              <Add />
              <span className="text-black"> Add Question</span>
            </button>
          </PermissionGranted>
        </div>

        <div className="mt-10 flex flex-col gap-14">
          {question && (
            <DndContext
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={question}>
                {question.map((el) => {
                  return (
                    <QuestionListDraggable
                      questionType={{
                        type: el.type,
                      }}
                      id={el.id}
                      key={el.id}
                      options={el.options}
                    />
                  );
                })}
              </SortableContext>
            </DndContext>
          )}
        </div>
        <div className="flex gap-5 w-fit ml-auto mt-24">
          <Button
            type="button"
            outline
            className="border transition-none delay-0 border-[#F04438] text-[#F04438] outline-transparent bg-transparent enabled:hover:bg-[#F04438] enabled:hover:text-white"
          >
            <Link className="" href={'/backoffice/manage-modul'}>
              Cancel
            </Link>
          </Button>
          <Button
            type="submit"
            color={'warning'}
            className="bg-[#FFC862] text-black"
          >
            {examId ? 'Update' : 'Submit'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormExamView;
