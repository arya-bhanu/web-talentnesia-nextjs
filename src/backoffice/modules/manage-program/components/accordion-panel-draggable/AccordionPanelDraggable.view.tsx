import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import DragIndicator from '@/../public/icons/drag_indicator.svg';
import ArrowUp from '@/../public/icons/arrow-up.svg';
import clsx from 'clsx';

import Edit from '@/../public/icons/manage-program/edit.svg';
import TrashXs from '@/../public/icons/manage-program/trash-xs.svg';
import AddXs from '@/../public/icons/manage-program/add-xs.svg';
import ClarityCertificate from '@/../public/icons/manage-program/clarity_certificate-line.svg';
import FluentShiftTeam from '@/../public/icons/manage-program/fluent_shifts-team-20-regular.svg';

import ListDraggable from '../list-draggable';

import {
  IAccordionPanelDraggable,
  IPopoverState,
} from './accordionPanelDraggable.type';
import MoreHoriz from '@/../public/icons/more_horiz.svg';
import PopoverAction from '@/backoffice/components/popover-action/PopoverAction';
import Modal from '@/backoffice/components/modal';
import FormMentoring from '../../form-program/components/form-mentoring';
import FormCertificate from '../../form-program/components/form-certificate';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AlertModal from '@/backoffice/components/alert-modal';
import FormContent from '../../form-program/components/form-course/components/form-content';
import { useFormMentoringStore } from '../../form-program/components/form-mentoring/formMentoring.store';

const AccordionPanelDraggableView: React.FC<
  IAccordionPanelDraggable &
    IPopoverState & {
      index: number;
      handleOpenModalMentoring: (action: 'open' | 'close') => void;
      handleOpenModalCertificate: (action: 'open' | 'close') => void;
      handleOpenModalContent: (action: 'open' | 'close') => void;
      handleSubmitModalMentoring: (e: FormEvent<HTMLFormElement>) => void;
      handleSubmitModalCertificate: (e: FormEvent<HTMLFormElement>) => void;
      handleSubmitModalContent: (
        e: FormEvent<HTMLFormElement>,
        chapterId: string,
      ) => void;
      handleDeleteChapter: (chapterId: string) => void;
      openModalContent: boolean;
      setOpenModalContent: Dispatch<SetStateAction<boolean>>;
      openModalCertificate: boolean;
      setOpenModalCertificate: Dispatch<SetStateAction<boolean>>;
      openModalMentoring: boolean;
      setOpenModalMentoring: Dispatch<SetStateAction<boolean>>;
    }
> = ({
  title,
  index,
  totalCurriculum,
  totalMinuteDuration,
  activeAccordion,
  setActiveAccordion,
  open,
  setOpen,
  contents,
  handleOpenModalMentoring,
  openModalMentoring,
  handleSubmitModalMentoring,
  setOpenModalMentoring,
  handleOpenModalCertificate,
  handleSubmitModalCertificate,
  handleSubmitModalContent,
  openModalCertificate,
  setOpenModalCertificate,
  handleOpenModalContent,
  openModalContent,
  setOpenModalContent,
  handleDeleteChapter,
  id,
}) => {
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const params = useSearchParams();
  const programId = params.get('programId');
  const schoolId = params.get('schoolId');
  const { clear } = useFormMentoringStore();

  useEffect(() => {
    if (deleteConfirm) {
      handleDeleteChapter(id);
    }
  }, [deleteConfirm]);
  return (
    <div
      className={clsx('p-4', index === activeAccordion ? 'bg-[#219EBC0F]' : '')}
    >
      <AlertModal
        openModal={openModalConfirm}
        setIsConfirmed={setDeleteConfirm}
        setOpenModal={setOpenModalConfirm}
      />
      <Modal
        title="Mentoring"
        buttonConfirmTitle="Submit"
        handleSubmit={handleSubmitModalMentoring}
        state={{
          openModal: openModalMentoring,
          setOpenModal: setOpenModalMentoring,
        }}
      >
        <FormMentoring chapterId={id} isModalOpen={openModalMentoring} />
      </Modal>
      <Modal
        title="Certificate"
        handleSubmit={handleSubmitModalCertificate}
        state={{
          openModal: openModalCertificate,
          setOpenModal: setOpenModalCertificate,
        }}
        buttonConfirmTitle="Save"
      >
        <FormCertificate />
      </Modal>
      <Modal
        title="Add content"
        buttonConfirmTitle="Submit"
        handleSubmit={(e) => handleSubmitModalContent(e, id)}
        state={{
          openModal: openModalContent,
          setOpenModal: setOpenModalContent,
        }}
      >
        <FormContent />
      </Modal>
      <div className="flex items-center gap-4">
        <button>
          <DragIndicator />
        </button>
        <div
          onClick={() => {
            if (index == activeAccordion) {
              setActiveAccordion(-1);
            } else {
              setActiveAccordion(index);
            }
          }}
          role="button"
          aria-pressed={false}
          className="flex items-center justify-between w-full cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="text-start">
              <h2 className="font-lato text-sm font-bold">{title}</h2>
              <div className="flex items-center gap-2 text-sm font-lato text-[#323232]">
                <p>{totalMinuteDuration} min</p>
                <p>{totalCurriculum} curriculum</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <PopoverAction
            openPopover={open}
            setOpenPopover={setOpen}
            content={
              <ul className="p-3 flex flex-col gap-3">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      clear();
                      handleOpenModalMentoring('open');
                    }}
                    className="text-sm font-lato flex items-center gap-2 font-normal"
                  >
                    <FluentShiftTeam />
                    Mentoring
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenModalContent('open')}
                    className="text-sm font-lato font-normal flex items-center gap-2"
                  >
                    <AddXs />
                    Add File Content
                  </button>
                </li>
                <li>
                  <Link
                    href={`/backoffice/manage-program/update-program-IICP/add-exam/?programId=${programId}&chapterId=${id}`}
                    type="button"
                    className="text-sm flex items-center gap-2 font-lato font-normal"
                  >
                    <AddXs />
                    Add Exam
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenModalCertificate('open')}
                    className="text-sm font-lato font-normal flex items-center gap-2"
                  >
                    <ClarityCertificate />
                    Certificate
                  </button>
                </li>
                <li>
                  <Link
                    href={`/backoffice/manage-program/update-program-IICP/edit-chapter/?programId=${programId}&chapterId=${id}&schoolId=${schoolId}`}
                    className="text-sm font-lato font-normal flex items-center gap-2"
                  >
                    <Edit />
                    Edit
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setOpenModalConfirm(true)}
                    className="text-sm font-lato font-normal flex items-center gap-2"
                  >
                    <TrashXs />
                    Delete
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
          <span
            className={clsx(
              'transition-all',
              index === activeAccordion ? 'rotate-0' : 'rotate-180',
            )}
          >
            <ArrowUp />
          </span>
        </div>
      </div>
      <div
        className={clsx(
          'flex flex-col gap-6 mt-7 pl-8',
          index === activeAccordion ? 'block' : 'hidden',
        )}
      >
        {contents.map((el, index) => (
          <ListDraggable key={index} {...el} />
        ))}
      </div>
    </div>
  );
};

export default AccordionPanelDraggableView;
