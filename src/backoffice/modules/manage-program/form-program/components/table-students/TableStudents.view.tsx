import { Table } from 'flowbite-react';
import React from 'react';
import { ITableStudents } from './tableStudents.type';
import clsx from 'clsx';
import RedTrash from '@/../public/icons/red-trash.svg';
import { useTableStudentStore } from './tableStudents.store';

const TableStudentsView: React.FC<ITableStudents> = ({ className }) => {
  const { dataStudentsJoined } = useTableStudentStore();
  return (
    <div className={clsx('overflow-x-auto', className)}>
      {!dataStudentsJoined || dataStudentsJoined.length === 0 ? (
        <p>Data Empty ...</p>
      ) : (
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>NIS</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {dataStudentsJoined.map((el, index) => {
              return (
                <Table.Row
                  key={el.userId}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell>{el.name}</Table.Cell>
                  <Table.Cell>{el.email}</Table.Cell>
                  <Table.Cell>{el.nis}</Table.Cell>
                  <Table.Cell>
                    <button>
                      <RedTrash />
                    </button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default TableStudentsView;
