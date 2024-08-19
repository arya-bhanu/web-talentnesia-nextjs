import LabelForm from '@/backoffice/components/label-form';
import TimeInput from '@/backoffice/components/time-input';
import { Select, TextInput } from 'flowbite-react';
import React from 'react';
import { IFormMentoring } from './formMentoring.type';
import dynamic from 'next/dynamic';
import ListMentoring from '../list-mentoring';

const Datepicker = dynamic(
  () =>
    import('@/backoffice/components/datepicker/Datepicker').then(
      (mod) => mod.Component,
    ),
  { ssr: false },
);

const FormMentoringView: React.FC<IFormMentoring> = ({ timeInputState }) => {
  return (
    <div>
      <form action="" className="py-5">
        <div className="flex items-center gap-5">
          <div className="flex-1">
            <LabelForm isImportant htmlFor="mentoring_name">
              Mentoring Name
            </LabelForm>
            <TextInput id="mentoring_name" name="mentoring_name" required />
          </div>
          <div className="flex-1">
            <LabelForm isImportant htmlFor="mentor">
              Mentor
            </LabelForm>
            <Select id="mentor" name="mentor" required>
              <option value="asyifa">Asyifa</option>
              <option value="asyifa_2">Asyifa 2</option>
              <option value="asyifa_3">Asyifa 3</option>
              <option value="asyifa_4">Asyifa 4</option>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-5">
          <div className="flex-1">
            <TimeInput
              setTime={timeInputState.setTime}
              time={timeInputState.time}
              label={{
                isImportant: true,
                text: 'Time',
              }}
            />
          </div>
          <div className="flex-1">
            <LabelForm isImportant htmlFor="session_date">
              Session Date
            </LabelForm>
            <Datepicker />
          </div>
          <div className="flex-1">
            <LabelForm isImportant htmlFor="url">
              URL
            </LabelForm>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3933 10.9399C15.6433 13.1899 15.6433 16.8299 13.3933 19.0699C11.1433 21.3099 7.50334 21.3199 5.26334 19.0699C3.02334 16.8199 3.01334 13.1799 5.26334 10.9399"
                    stroke="#989FAD"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.9235 13.4099C8.58346 11.0699 8.58346 7.26988 10.9235 4.91988C13.2635 2.56988 17.0635 2.57988 19.4135 4.91988C21.7635 7.25988 21.7535 11.0599 19.4135 13.4099"
                    stroke="#989FAD"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="url"
                name="url"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="zba-ser-twf"
              />
            </div>
          </div>
        </div>
        <button className="flex mt-5 w-fit ml-auto items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:focus:ring-yellow-900">
          <span className="text-black font-semibold">Save Mentoring</span>
        </button>
      </form>
      <div className="flex flex-col gap-3 mt-3">
        <h2 className="font-poppins font-semibold">List Mentoring</h2>
        <ListMentoring />
      </div>
    </div>
  );
};

export default FormMentoringView;
