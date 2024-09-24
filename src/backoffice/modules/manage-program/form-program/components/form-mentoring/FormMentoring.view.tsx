import LabelForm from '@/backoffice/components/label-form';
import TimeInput from '@/backoffice/components/time-input';
import { Select, TextInput } from 'flowbite-react';
import React, { useEffect } from 'react';
import {
  IDateInput,
  IFormMentoring,
  IHandler,
  ITimeInputRange,
} from './formMentoring.type';
import dynamic from 'next/dynamic';
import ListMentoring from '../list-mentoring';
import { useFormMentoringStore } from './formMentoring.store';
import TimeInputRange from '@/backoffice/components/time-input-range/TimeInputRange';
import { convertTimeHHmmssToDate } from '@/helpers/formatter.helper';
import Image from 'next/image';

const Datepicker = dynamic(
  () =>
    import('@/backoffice/components/datepicker/Datepicker').then(
      (mod) => mod.Component,
    ),
  { ssr: false },
);

const FormMentoringView: React.FC<
  IFormMentoring & IHandler & ITimeInputRange & IDateInput
> = ({
  date,
  setDate,
  setTimeEnd,
  setTimeStart,
  timeEnd,
  timeStart,
  chapterId,
}) => {
  const { mentors, defaultMentoring } = useFormMentoringStore();
  useEffect(() => {
    if (defaultMentoring?.startTime && defaultMentoring.endTime) {
      setTimeEnd(convertTimeHHmmssToDate(defaultMentoring.endTime));
      setTimeStart(convertTimeHHmmssToDate(defaultMentoring.startTime));
    }
    if (defaultMentoring?.date) {
      setDate(new Date(defaultMentoring.date).toString());
    }
  }, [JSON.stringify(defaultMentoring)]);
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <LabelForm isImportant htmlFor="mentoring_name">
            Mentoring Name
          </LabelForm>
          <TextInput
            id="mentoring_name"
            defaultValue={defaultMentoring?.title}
            key={defaultMentoring?.title}
            placeholder='Input mentoring name'
            name="mentoring_name"
            required
          />
        </div>
        <div className="flex-1">
          <LabelForm isImportant htmlFor="mentor">
            Mentor
          </LabelForm>
          <Select
            defaultValue={defaultMentoring?.mentorId}
            key={defaultMentoring?.mentorId}
            id="mentor"
            name="mentor"
            required
          >
            {mentors?.map((el) => {
              return (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              );
            })}
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-5">
        <div className="flex-1">
          <TimeInputRange
            label={{ isImportant: true, text: 'Time' }}
            setTimeEnd={setTimeEnd}
            setTimeStart={setTimeStart}
            timeEnd={timeEnd}
            timeStart={timeStart}
          />
        </div>
        <div className="flex-1">
          <LabelForm isImportant htmlFor="session_date">
            Session Date
          </LabelForm>
          <Datepicker selectedDate={date} setSelectedDate={setDate} />
        </div>
        <div className="flex-1">
          <LabelForm isImportant htmlFor="url">
            URL
          </LabelForm>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <Image src={"/icons/link-2.svg"} width={18} height={18} alt='unavailable'/>
            </div>
            <input
              defaultValue={defaultMentoring?.link}
              key={defaultMentoring?.link}
              type="text"
              id="url"
              name="url"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Input link mentoring"
              required
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="flex mt-5 w-fit ml-auto items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:focus:ring-yellow-900"
      >
        <span className="text-black font-semibold">Save Mentoring</span>
      </button>

      <div className="flex flex-col gap-3">
        <h2 className="font-poppins font-semibold">List Mentoring</h2>
        <ListMentoring chapterId={chapterId} />
      </div>
    </>
  );
};

export default FormMentoringView;
