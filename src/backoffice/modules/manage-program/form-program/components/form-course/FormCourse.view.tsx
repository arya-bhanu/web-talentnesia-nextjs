'use client';
import LabelForm from '@/backoffice/components/label-form';
import Modal from '@/backoffice/components/modal';

import ModulProgress from '@/backoffice/modules/manage-program/form-program/components/modul-progress';
import { Select } from 'flowbite-react/components/Select';
import React from 'react';
import { IHandlerFormCourse, IStateFormCourse } from './formCourse.type';
import { Button } from 'flowbite-react/components/Button';
import Link from 'next/link';
import { useFormCourseStore } from './formCourse.store';
import ContainerChapter from './components/container-chapter';
import { useSearchParams } from 'next/navigation';

const FormCourseView: React.FC<IStateFormCourse & IHandlerFormCourse> = ({
  handleSubmitSelectedModul,
  openModalModul,
  setOpenModalModul,
}) => {
  const { data, modules, activeModule } = useFormCourseStore();
  const params = useSearchParams();
  const programId = params.get('programId');
  const schoolId = params.get('schoolId');
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
          {modules && (
            <>
              <LabelForm isImportant htmlFor="modul">
                Modul Name
              </LabelForm>
              <Select
                defaultValue={activeModule || undefined}
                id="modul"
                name="modul"
              >
                {modules.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </Select>
            </>
          )}
        </div>
      </Modal>
      <div className="flex items-center justify-between gap-10">
        <ModulProgress
          progress={data?.progress || 0}
          title={data?.name || ''}
          className="flex-1"
        />
        <div className="flex items-center gap-3">
          <Link
            href={`/backoffice/manage-program/update-program-IICP/add-chapter/?programId=${programId}&schoolId=${schoolId}`}
            type="button"
            className="text-yellow-400 group hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
          >
            <span className="text-black group-hover:text-white">
              Add Chapter
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpenModalModul(true)}
            className="flex items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:focus:ring-yellow-900"
          >
            <span className="text-black font-semibold"> Select Module</span>
          </button>
        </div>
      </div>
      <ContainerChapter className="mt-10 max-h-[60vh] overflow-y-auto" />
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
