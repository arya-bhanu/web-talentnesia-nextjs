import LabelForm from '@/backoffice/components/label-form/LabelForm';
import { Button } from 'flowbite-react/components/Button';
import { TextInput } from 'flowbite-react/components/TextInput';
import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import Add from '@/../public/icons/add.svg';
import AddWhite from '@/../public/icons/add-white.svg';
import EditableListContent from '@/backoffice/components/editable-list-content';
import Modal from '@/backoffice/components/modal';
import FormContent from '../form-content';
import { IFormChapter, ISubmitType } from './formChapter.type';
import Link from 'next/link';
import clsx from 'clsx';

const FormChapterView: React.FC<
  IFormChapter &
    ISubmitType & { setSubmitType: Dispatch<SetStateAction<ISubmitType>> }
> = ({
  handleSubmitAddContent,
  stateFormAddContent,
  id,
  handleSubmitCreateChapter,
  setActionSubChapter,
  defaultValueData,
  contents,
  setSubmitType,
}) => {
  const isHasExam = useMemo(() => {
    if (contents.data && contents.data.length > 0) {
      const findExam = contents.data.find((el) => el.isexam);
      return findExam ? true : false;
    }
    return false;
  }, [contents.data]);
  const renderContents = useMemo(() => {
    if (contents.isLoading) {
      return <h1>Loading...</h1>;
    }

    if (contents.data?.length === 0 || !contents.data) {
      return <p>Empty content</p>;
    }

    return contents.data.map((el) => (
      <EditableListContent {...el} key={el.id} />
    ));
  }, [contents]);

  return (
    <div>
      <Modal
        handleSubmit={handleSubmitAddContent}
        state={stateFormAddContent}
        title="Add Content"
      >
        <FormContent />
      </Modal>
      <form
        onSubmit={(el) => {
          handleSubmitCreateChapter(el);
        }}
      >
        <div>
          <div className="mb-2 block">
            <LabelForm aria-required htmlFor="chapter" isImportant>
              Chapter Name
            </LabelForm>
          </div>
          <TextInput
            id="chapter"
            name="chapter"
            type="text"
            placeholder="Chapter 1"
            required
            className={clsx('w-full')}
            defaultValue={defaultValueData?.title}
            key={defaultValueData?.title}
          />
        </div>
        <div className="mt-14">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold font-poppins">Content</h3>
            <div className="flex items-center gap-2">
              {!isHasExam && (
                <Button
                  onClick={() => setActionSubChapter('exam')}
                  type="submit"
                  disabled={isHasExam}
                  className="border flex items-center transition-none delay-0  text-white outline-transparent  enabled:hover:bg-[#1d829b] bg-[#219EBC]"
                >
                  <AddWhite />
                  <span>Add Exam</span>
                </Button>
              )}
              <button
                onClick={() => setActionSubChapter('content')}
                type="submit"
                className="flex items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5  dark:focus:ring-yellow-900"
              >
                <Add />
                <span className="text-black"> Add Content</span>
              </button>
            </div>
          </div>
          <section className="flex flex-col gap-5 mt-8">
            {renderContents}
          </section>
        </div>
        <div className="flex gap-5 w-fit ml-auto mt-14">
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
            onClick={() => setSubmitType({ type: 'defaultSubmit' })}
            type="submit"
            color={'warning'}
            className="bg-[#FFC862] text-black"
          >
            {id ? 'Update' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormChapterView;
