import LabelForm from '@/backoffice/components/label-form/LabelForm';
import { Button } from 'flowbite-react/components/Button';
import { TextInput } from 'flowbite-react/components/TextInput';
import React from 'react';
import Add from '../../../../../../public/icons/add.svg';
import AddWhite from '../../../../../../public/icons/add-white.svg';
import { IEditableListContent } from '@/backoffice/components/editable-list-content/editableListContent.type';
import EditableListContent from '@/backoffice/components/editable-list-content';
import Modal from '@/backoffice/components/modal';
import FormContent from '../form-content';
import { IFormChapter } from './formChapter.type';
import Link from 'next/link';

const chapters: IEditableListContent[] = [
  {
    id: 1,
    durationMinute: 30,
    title: 'UX Introduction',
    urlImg: '/icons/play-circle.svg',
  },
  {
    id: 2,
    durationMinute: 35,
    title: 'Mentoring 1',
    urlImg: '/icons/play-circle.svg',
  },
  {
    id: 3,
    durationMinute: 20,
    title: 'Hick’s Law ',
    urlImg: '/icons/play-circle.svg',
  },
  {
    id: 4,
    durationMinute: 60,
    title: 'Concistency for your design',
    urlImg: '/icons/play-circle.svg',
  },
  {
    id: 5,
    durationMinute: 10,
    title: 'Jacob’s Law',
    urlImg: '/icons/play-circle.svg',
  },
];
const FormChapterView: React.FC<IFormChapter> = ({
  handleSubmitAddContent,
  stateFormAddContent,
}) => {
  return (
    <div>
      <Modal
        handleSubmit={handleSubmitAddContent}
        state={stateFormAddContent}
        title="Add Content"
      >
        <FormContent />
      </Modal>
      <form action="">
        <div>
          <div className="mb-2 block">
            <LabelForm aria-required htmlFor="modul" isImportant>
              Chapter Name
            </LabelForm>
          </div>
          <TextInput
            id="modul"
            name="modul"
            type="text"
            placeholder="Design Thinking"
            required
            className="w-full"
          />
        </div>
      </form>
      <div className="mt-14">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold font-poppins">Content</h3>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              className="border items-center transition-none delay-0  text-white outline-transparent  enabled:hover:bg-[#1d829b] bg-[#219EBC]"
            >
              <Link className='flex items-center' href={'/backoffice/manage-modul/create/chapter/add-exam'}>
                <AddWhite />
                <span>Add Exam</span>
              </Link>
            </Button>
            <button
              onClick={() => stateFormAddContent.setOpenModal(true)}
              type="submit"
              className="flex items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5  dark:focus:ring-yellow-900"
            >
              <Add />
              <span className="text-black"> Add Content</span>
            </button>
          </div>
        </div>
        <section className="flex flex-col gap-5 mt-8">
          {chapters.map((el) => (
            <EditableListContent {...el} key={el.id} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default FormChapterView;
