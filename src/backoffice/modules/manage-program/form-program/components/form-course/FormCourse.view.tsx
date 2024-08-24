import LabelForm from '@/backoffice/components/label-form';
import Modal from '@/backoffice/components/modal';
import AccordionPanelDraggable from '@/backoffice/modules/manage-program/components/accordion-panel-draggable';
import ModulProgress from '@/backoffice/modules/manage-program/form-program/components/modul-progress';
import { Select } from 'flowbite-react/components/Select';
import React from 'react';
import { IHandlerFormCourse, IStateFormCourse } from './formCourse.type';
import { Button } from 'flowbite-react/components/Button';
import Link from 'next/link';

const FormCourseView: React.FC<IStateFormCourse & IHandlerFormCourse> = ({
  activeAccordion,
  handleSubmitSelectedModul,
  openModalModul,
  setActiveAccordion,
  setOpenModalModul,
}) => {
  return (
    <form>
      <Modal
        title="Select Modul"
        state={{
          openModal: openModalModul,
          setOpenModal: setOpenModalModul,
        }}
        buttonConfirmTitle="Save"
        handleSubmit={handleSubmitSelectedModul}
      >
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
      </Modal>
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
      <div className="flex justify-end space-x-4 mt-10">
        <Button
          type="button"
          outline
          className="border transition-none delay-0 border-[#F04438] text-[#F04438] outline-transparent bg-transparent enabled:hover:bg-[#F04438] enabled:hover:text-white"
        >
          <Link className="" href={'/backoffice/manage-program'}>
            Cancel
          </Link>
        </Button>
        <Button
          type="submit"
          color={'warning'}
          className="bg-[#FFC862] text-black"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default FormCourseView;
