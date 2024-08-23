import React from 'react';
import { IListMentoring } from './listMentoring.type';
import { Table } from 'flowbite-react/components/Table';
import Image from 'next/image';

const ListMentoringView: React.FC<IListMentoring> = () => {
  return (
    <div className="overflow-auto">
      <Table>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="font-lato text-sm text-[#2B2F38] font-normal">
              1
            </Table.Cell>
            <Table.Cell className="font-lato text-sm text-[#2B2F38] font-normal">
              Asyiaf
            </Table.Cell>
            <Table.Cell className="font-lato text-sm text-[#2B2F38] font-normal">
              14 Januari 2024
            </Table.Cell>
            <Table.Cell className="font-lato text-sm text-[#2B2F38] font-normal">
              13:00 - 15:00
            </Table.Cell>
            <Table.Cell>
              <button className="text-sm font-lato flex items-center gap-7">
                <span className="text-[#219EBC]">qit-bwe-qop</span>
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
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="font-lato text-sm text-[#2B2F38] font-normal">
              2
            </Table.Cell>
            <Table.Cell className="font-lato text-sm text-[#2B2F38] font-normal">
              Asyiap
            </Table.Cell>
            <Table.Cell className="font-lato text-sm text-[#2B2F38] font-normal">
              14 Januari 2024
            </Table.Cell>
            <Table.Cell className="font-lato text-sm text-[#2B2F38] font-normal">
              13:00 - 15:00
            </Table.Cell>
            <Table.Cell>
              <button className="text-sm font-lato flex items-center gap-7">
                <span className="text-[#219EBC]">qit-bwe-qop</span>
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
        </Table.Body>
      </Table>
    </div>
  );
};

export default ListMentoringView;
