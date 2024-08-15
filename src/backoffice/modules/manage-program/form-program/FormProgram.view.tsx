'use client';

import { Button, Label, TextInput, Radio, Card, Select } from 'flowbite-react';
import { TabFlex } from '@/backoffice/components/tabs/tabs';
import MentorSelector from '@/backoffice/components/mentor-selector/mentorSelector';
import { DropFile } from '@/backoffice/components/drop-files-input/dropFilesInput'; // Mengimpor dropFile
import LabelForm from '@/backoffice/components/label-form';
import { IFormProgram } from './formProgram.type';
import Search from '@/../public/icons/iconamoon_search-bold.svg';
import dynamic from 'next/dynamic';
import Add from '@/../public/icons/add.svg';
import TableStudents from './components/table-students';
import ModalSelect from '@/backoffice/components/modal-select/ModalSelect';
import ModulProgress from './components/modul-progress';
import AccordionPanelDraggable from '@/backoffice/modules/manage-program/components/accordion-panel-draggable';
import { IAccordionPanelDraggable } from '@/backoffice/modules/manage-program/components/accordion-panel-draggable/accordionPanelDraggable.type';
import Modal from '@/backoffice/components/modal';
import { Dispatch, FormEvent, SetStateAction } from 'react';

const Datepicker = dynamic(
  () =>
    import('@/backoffice/components/datepicker/Datepicker').then(
      (mod) => mod.Component,
    ),
  { ssr: false },
);

function FormProgramView({
  mentors,
  setMentors,
  setStatus,
  status,
  open,
  selected,
  setOpen,
  setSelected,
  columns,
  rows,
  activeAccordion,
  setActiveAccordion,
  openModalModul,
  setOpenModalModul,
  handleSubmitSelectedModul,
}: IFormProgram &
  Pick<IAccordionPanelDraggable, 'activeAccordion' | 'setActiveAccordion'> & {
    openModalModul: boolean;
    setOpenModalModul: Dispatch<SetStateAction<boolean>>;
    handleSubmitSelectedModul: (e: FormEvent<HTMLFormElement>) => void;
  }) {
  const handleMentorChange = (mentor: string) => {
    setMentors((prev) =>
      prev.includes(mentor)
        ? prev.filter((m) => m !== mentor)
        : [...prev, mentor],
    );
  };

  const tabs = [
    {
      title: 'Detail',
      content: (
        <div className="grid grid-cols-2 gap-6">
          {/* Program Name */}
          <div>
            <LabelForm isImportant htmlFor="program_name">
              Program Name
            </LabelForm>
            <TextInput
              id="programName"
              placeholder="Kelas D Tefa SMK"
              required
            />
          </div>

          {/* Status */}
          <div>
            <LabelForm isImportant htmlFor="status">
              Status
            </LabelForm>
            <div className="flex items-center space-x-4">
              <Radio
                id="notStarted"
                name="status"
                value="Not Started"
                checked={status === 'Not Started'}
                onChange={(e) => setStatus(e.target.value)}
              />
              <Label htmlFor="notStarted" value="Not Started" />
              <Radio
                id="onGoing"
                name="status"
                value="On Going"
                checked={status === 'On Going'}
                onChange={(e) => setStatus(e.target.value)}
              />
              <Label htmlFor="onGoing" value="On Going" />
            </div>
          </div>

          {/* Mentor Selector */}
          <div className="col-span-1">
            <LabelForm isImportant htmlFor="mentor">
              Mentor
            </LabelForm>
            <MentorSelector />
          </div>

          {/* Cover Image */}
          <div className="col-span-1">
            <LabelForm htmlFor="cover_image">Cover Image</LabelForm>
            {DropFile()}{' '}
            {/* Menggunakan komponen dropFile yang sudah dimodifikasi */}
          </div>

          {/* Date Picker */}
          <div>
            <LabelForm isImportant htmlFor="start_date">
              Start Date
            </LabelForm>
            <Datepicker />
          </div>
          <div>
            <LabelForm isImportant htmlFor="ned_date">
              End Date
            </LabelForm>
            <Datepicker />
          </div>

          {/* School */}
          <div className="col-span-2">
            <LabelForm htmlFor="school">School</LabelForm>
            <Select id="school" name="school" required>
              <option selected value="" disabled>
                Select School
              </option>
              <option value="1">School 1</option>
              <option value="2">School 2</option>
            </Select>
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end space-x-4">
            <Button color="gray">Cancel</Button>
            <Button color="yellow">Submit</Button>
          </div>
        </div>
      ),
      active: true,
    },
    {
      title: 'Course',
      content: (
        <div>
          <Modal
            title="Select Modul"
            state={{
              openModal: openModalModul,
              setOpenModal: setOpenModalModul,
            }}
            buttonConfirmTitle='Save'
            handleSubmit={handleSubmitSelectedModul}
            children={
              <div>
                <LabelForm isImportant htmlFor="modul">
                  Modul Name
                </LabelForm>
                <Select id="modul" name="modul">
                  <option value={1}>Modul 1</option>
                  <option value={2}>Modul 2</option>
                  <option value={3}>Modul 3</option>
                </Select>
              </div>
            }
          />
          <div className="flex items-center justify-between gap-10">
            <ModulProgress
              progress={50}
              title="UI/UX Designer"
              className="flex-1"
            />
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="text-yellow-400 group hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
              >
                <span className="text-black group-hover:text-white">
                  Add Chapter
                </span>
              </button>
              <button
                onClick={() => setOpenModalModul(true)}
                className="flex items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:focus:ring-yellow-900"
              >
                <span className="text-black font-semibold"> Select Module</span>
              </button>
            </div>
          </div>
          <div className="mt-5">
            <AccordionPanelDraggable
              key={1}
              activeAccordion={activeAccordion}
              setActiveAccordion={setActiveAccordion}
              title="UX Design Principles"
              index={1}
              totalCurriculum={6}
              contents={[
                {
                  date: new Date(),
                  durationMinute: 30,
                  title: 'Law',
                  type: '1',
                },
                {
                  date: new Date(),
                  durationMinute: 20,
                  title: 'Law Hick',
                  type: '2',
                },
              ]}
              totalMinuteDuration={58}
            />
            <AccordionPanelDraggable
              key={2}
              activeAccordion={activeAccordion}
              setActiveAccordion={setActiveAccordion}
              title="UI Design Principles"
              index={2}
              totalCurriculum={6}
              totalMinuteDuration={45}
              contents={[
                {
                  date: new Date(),
                  durationMinute: 30,
                  title: 'Law',
                  type: '1',
                },
                {
                  date: new Date(),
                  durationMinute: 20,
                  title: 'Law Hick',
                  type: '2',
                },
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Student',
      content: (
        <div>
          <div className="flex justify-between">
            <div className="flex items-center max-w-xs w-full">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <Search />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search ..."
                  required
                />
              </div>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            >
              <Add />
              <span className="text-black"> Browse All</span>
            </button>
          </div>
          <TableStudents className="mt-5" />
        </div>
      ),
    },
  ];

  return (
    <Card>
      <ModalSelect
        open={open}
        selected={selected}
        setOpen={setOpen}
        setSelected={setSelected}
        columns={columns}
        title="Select Student"
        rows={rows}
      />
      <TabFlex tabs={tabs} />
    </Card>
  );
}

export default FormProgramView;
