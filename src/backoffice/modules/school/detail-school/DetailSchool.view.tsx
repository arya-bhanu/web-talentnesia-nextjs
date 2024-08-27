'use client';

import { TabFlex } from '@/backoffice/components/tabs/tabs';
import { IDetailSchoolView, SchoolData } from './detailSchool.type';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import ModalAddProgram from '@/backoffice/components/modal-add-program/ModalAddProgram';
import DetailSchoolPage from './components/detail-course';
import ListTableStudent from './components/list-table-student';
import { TabsProgram } from '../components/tabs-program/TabsProgram';

interface DetailSchoolViewProps extends IDetailSchoolView {
  activeAccordion: number;
  setActiveAccordion: Dispatch<SetStateAction<number>>;
  openModalModul: boolean;
  setOpenModalModul: Dispatch<SetStateAction<boolean>>;
  handleSubmitSelectedModul: (e: FormEvent<HTMLFormElement>) => void;
  className?: string;
  schoolData: SchoolData | null;
  fullImageUrl: string;
}

function DetailSchoolView({
  open,
  selected,
  setOpen,
  setSelected,
  columns,
  rows,
  schoolId,
  schoolData,
  fullImageUrl,
}: DetailSchoolViewProps) {
  const tabs = [
    {
      title: 'Detail School',
      content: <DetailSchoolPage />,
    },
    {
      title: 'Student',
      content: <ListTableStudent />,
    },
    {
      title: 'Program',
      content: (
        <TabsProgram />
      ),
    },
  ];

  return (
    <>
      <ModalAddProgram
        open={open}
        selected={selected}
        setOpen={setOpen}
        setSelected={setSelected}
        columns={columns}
        title="Select Program"
        rows={rows}
      />
      <TabFlex tabs={tabs} />
    </>
  );
}

export default DetailSchoolView;
