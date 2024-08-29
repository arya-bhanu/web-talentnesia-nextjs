import React from 'react';
import { IListMentoring } from './listMentoring.type';
import { Table } from 'flowbite-react/components/Table';
import Image from 'next/image';
import { useFormMentoringStore } from '../form-mentoring/formMentoring.store';
import {
  convertDateIntoIDDate,
  convertTimeHHmmss,
} from '@/helpers/formatter.helper';

const ListMentoringView: React.FC<IListMentoring> = () => {
  const { mentorings } = useFormMentoringStore();
  return (
    <div className="overflow-y-auto max-h-[20vh]">
      {mentorings && (
        <Table>
          <Table.Body className="divide-y">
            {mentorings.map((el, index) => (
              <Table.Row
                key={el.mentorId}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="font-lato text-sm text-[#2B2F38] font-normal">
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
                <Table.Cell>
                  <button className="text-sm font-lato flex items-center gap-7">
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
                  <button>
                    <Image
                      alt="icon"
                      src={'/icons/manage-program/Edit-btn.svg'}
                      width={32}
                      height={32}
                      className="w-6 h-6 object-contain"
                    />
                  </button>
                  <button>
                    <Image
                      alt="icon"
                      src={'/icons/manage-program/trash-btn.svg'}
                      width={32}
                      height={32}
                      className="w-6 h-6 object-contain"
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
