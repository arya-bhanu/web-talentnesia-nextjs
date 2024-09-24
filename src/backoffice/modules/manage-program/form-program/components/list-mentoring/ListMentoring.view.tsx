import React, { useEffect, useState } from 'react';
import { IListMentoring, IListMentoringHandler } from './listMentoring.type';
import { Table } from 'flowbite-react/components/Table';
import Image from 'next/image';
import { useFormMentoringStore } from '../form-mentoring/formMentoring.store';
import {
  convertDateIntoIDDate,
  convertTimeHHmmss,
} from '@/helpers/formatter.helper';
import AlertModal from '@/backoffice/components/alert-delete-modal';

const ListMentoringView: React.FC<IListMentoring & IListMentoringHandler> = ({
  handleDeleteMentoring,
}) => {
  const [modalDelete, setModalDelete] = useState(false);
  const [isConfirmDel, setIsConfirmDel] = useState(false);
  const [idMentoring, setIdMentoring] = useState('');
  const { mentorings, setIdDefaultMentoring } = useFormMentoringStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string = '', link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  useEffect(() => {
    if (isConfirmDel) {
      handleDeleteMentoring(idMentoring);
    }
  }, [isConfirmDel]);
  return (
    <div className="overflow-y-auto max-h-[20vh]">
      <AlertModal
        openModal={modalDelete}
        setOpenModal={setModalDelete}
        setIsConfirmed={setIsConfirmDel}
      />
      {mentorings && (
        <Table>
          <Table.Body className="divide-y">
            {mentorings.map((el, index) => (
              <Table.Row
                key={el.mentorId}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="font-lato text-sm text-[#2B2F38] font-normal w-[5%]">
                  {index + 1}
                </Table.Cell>
                <Table.Cell className="font-lato text-sm text-[#2B2F38] font-normal">
                  {el.title}
                </Table.Cell>
                <Table.Cell className="font-lato text-sm text-[#2B2F38] font-normal">
                  {convertDateIntoIDDate(new Date(el.date))}
                </Table.Cell>
                <Table.Cell className="font-lato text-sm text-[#2B2F38] font-normal">
                  {convertTimeHHmmss(el.startTime)} -{' '}
                  {convertTimeHHmmss(el.endTime)}
                </Table.Cell>
                <Table.Cell className="w-[20%]">
                  <button
                    className="text-sm font-lato flex items-center gap-7"
                    type="button"
                    onClick={() => handleCopy(el.id, el.link)}
                  >
                    <span className="text-[#219EBC]">{el.link}</span>
                    <Image
                      alt="icon"
                      src={'/icons/manage-program/content_copy.svg'}
                      width={32}
                      height={32}
                      className="w-4 h-4 object-contain"
                    />
                  </button>
                </Table.Cell>
                <Table.Cell className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (el.id) setIdDefaultMentoring(el.id);
                    }}
                  >
                    <Image
                      alt="icon"
                      src={'/icons/manage-program/Edit-btn.svg'}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (el.id) setIdMentoring(el.id);
                      setModalDelete(true);
                    }}
                  >
                    <Image
                      alt="icon"
                      src={'/icons/manage-program/trash-btn.svg'}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default ListMentoringView;
