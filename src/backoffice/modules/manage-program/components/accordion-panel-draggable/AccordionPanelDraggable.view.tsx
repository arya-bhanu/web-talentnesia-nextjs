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
import FormGenerate from '../../form-program/components/form-generateCertificate';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AlertModal from '@/backoffice/components/alert-delete-modal';
import FormContent from '../../form-program/components/form-course/components/form-content';
import { useFormMentoringStore } from '../../form-program/components/form-mentoring/formMentoring.store';
import { SortableContext, useSortable } from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import { useDragContents } from '../../form-program/components/add-exam/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { reorderContent } from '../../form-program/components/form-course/api/formCourse.api';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import ModalGenerate from '../../form-program/components/form-generateCertificate/components/modal';
import PermissionGranted from '@/backoffice/components/permission-granted/PermissionGranted';

const AccordionPanelDraggableView: React.FC<
  IAccordionPanelDraggable &
  IPopoverState & {
    index: number;
    totalMinuteDuration: number;
    totalCurriculum: number;
    handleOpenModalMentoring: (action: 'open' | 'close') => void;
    handleOpenModalCertificate: (action: 'open' | 'close') => void;
    handleOpenModalGenerate: (action: 'open' | 'close') => void;
    handleOpenModalContent: (action: 'open' | 'close') => void;
    handleSubmitModalMentoring: (e: FormEvent<HTMLFormElement>) => void;
    handleSubmitModalCertificate: (e: FormEvent<HTMLFormElement>) => void;
    handleSubmitModalGenerate: (e: FormEvent<HTMLFormElement>) => void;
    handleSubmitModalContent: (
      e: FormEvent<HTMLFormElement>,
      chapterId: string,
    ) => void;
    handleDeleteChapter: (chapterId: string) => void;
    openModalContent: boolean;
    setOpenModalContent: Dispatch<SetStateAction<boolean>>;
    openModalCertificate: boolean;
    setOpenModalCertificate: Dispatch<SetStateAction<boolean>>;
    openModalGenerate: boolean;
    setOpenModalGenerate: Dispatch<SetStateAction<boolean>>;
    openModalMentoring: boolean;
    setOpenModalMentoring: Dispatch<SetStateAction<boolean>>;
  }
> = ({
  title,
  index,
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
  handleOpenModalGenerate,
  handleSubmitModalCertificate,
  handleSubmitModalGenerate,
  handleSubmitModalContent,
  openModalCertificate,
  setOpenModalCertificate,
  openModalGenerate,
  setOpenModalGenerate,
  handleOpenModalContent,
  openModalContent,
  setOpenModalContent,
  handleDeleteChapter,
  id,
  totalCurriculum,
  totalMinuteDuration,
}) => {
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const params = useSearchParams();
    const programId = params.get('programId');
    const schoolId = params.get('schoolId');
    const { clear } = useFormMentoringStore();
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
    const { setSortContents, sortActionContents, sortContents } =
      useDragContents();

    const { mutateAsync: reorderContentAsync } = useMutation({
      mutationFn: reorderContent,
      mutationKey: ['contents', 'reorder'],
    });

    const queryClient = useQueryClient();

    useEffect(() => {
      if (deleteConfirm) {
        handleDeleteChapter(id);
      }
    }, [deleteConfirm]);

    useEffect(() => {
      if (contents && index === activeAccordion) {
        const sortData = contents.sort((a, b) => a.order - b.order);
        if (sortData && sortData.length > 0) {
          setSortContents(sortData);
        } else {
          setSortContents(null);
        }
      }
    }, [JSON.stringify(contents), index === activeAccordion]);

    useEffect(() => {
      if (id && sortContents) {
        const executeMutation = async () => {
          if (sortContents && sortContents.length > 0) {
            try {
              await reorderContentAsync({
                chapterId: id,
                contents: sortContents.map((el) => el.id),
              });
              queryClient.invalidateQueries({ queryKey: ['module'] });
            } catch (err) {
              console.error(err);
            }
          }
        };
        executeMutation();
      }
    }, [JSON.stringify(sortContents)]);

    function handleDragEnd(event: DragEndEvent): void {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        sortActionContents(active, over);
      }
    }
    return (
      <div
        ref={setNodeRef}
        style={style}
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
        <ModalGenerate
          title="Generate Certificate"
          handleSubmit={handleSubmitModalGenerate}
          state={{
            openModal: openModalGenerate,
            setOpenModal: setOpenModalGenerate,
          }}
          buttonConfirmTitle="Save"
        >
          <FormGenerate />
        </ModalGenerate>
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
          <button type="button" {...listeners} {...attributes} className="button">
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
                  <PermissionGranted
                    roleable
                    role="manage-program.iicp.course.addFileContent"
                  >
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
                  </PermissionGranted>
                  <PermissionGranted
                    roleable
                    role="manage-program.iicp.course.addExam"
                  >
                    <li>
                      <Link
                        href={`/backoffice/manage-program/update-program/add-exam/?programId=${programId}&chapterId=${id}`}
                        type="button"
                        className="text-sm flex items-center gap-2 font-lato font-normal"
                      >
                        <AddXs />
                        Add Exam
                      </Link>
                    </li>
                  </PermissionGranted>
                  <PermissionGranted
                    roleable
                    role="manage-program.iicp.course.certificate"
                  >
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
                  </PermissionGranted>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleOpenModalGenerate('open')}
                      className="text-sm font-lato font-normal flex items-center gap-2"
                    >
                      <ClarityCertificate />
                      Generate Certificate
                    </button>
                  </li>
                  <PermissionGranted
                    roleable
                    role="manage-program.iicp.course.editProgram"
                  >
                    <li>
                      <Link
                        href={`/backoffice/manage-program/update-program/edit-chapter/?programId=${programId}&chapterId=${id}&schoolId=${schoolId}`}
                        className="text-sm font-lato font-normal flex items-center gap-2"
                      >
                        <Edit />
                        Edit
                      </Link>
                    </li>
                  </PermissionGranted>
                  <PermissionGranted roleable role='manage-program.iicp.course.delete'>
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
                  </PermissionGranted>
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
        {sortContents && (
          <div
            className={clsx(
              'flex flex-col gap-6 mt-7 pl-8',
              index === activeAccordion ? 'block' : 'hidden',
            )}
          >
            <DndContext
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext items={sortContents}>
                {sortContents.map((el) => (
                  <ListDraggable key={el.id} {...el} />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        )}
      </div>
    );
  };

export default AccordionPanelDraggableView;
