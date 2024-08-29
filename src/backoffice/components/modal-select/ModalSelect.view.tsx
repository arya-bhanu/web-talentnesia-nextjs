'use client';
import { Button } from 'flowbite-react/components/Button';
import { Modal } from 'flowbite-react/components/Modal';
import React, { FormEvent, useRef } from 'react';
import { IModalSelect } from './modalSelect.type';
import { Checkbox } from 'flowbite-react';
import { useTableStudentStore } from '../../modules/manage-program/form-program/components/table-students/tableStudents.store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createStudentJoin } from '@/backoffice/modules/manage-program/form-program/components/table-students/api/tableStudents.api';
import { useSearchParams } from 'next/navigation';
import IconLeft from '@/../public/icons/btn-left.svg';
import IconRight from '@/../public/icons/btn-right.svg';

const ModalSelectView: React.FC<IModalSelect> = ({ open, setOpen, title }) => {
  const formRef = useRef(null);
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const { dataSchoolStudents } = useTableStudentStore();

  const { mutateAsync: createJoinStudentAsync } = useMutation({
    mutationFn: createStudentJoin,
    mutationKey: ['student', 'join'],
  });

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formRef.current) {
      const form = formRef.current as HTMLFormElement;
      const checkedValues = Array.from(
        form.querySelectorAll('input[type="checkbox"]:checked'),
      ).map((checkbox) => {
        return (checkbox as HTMLInputElement).id;
      });

      const programId = params.get('programId');
      if (programId && checkedValues) {
        const response = await createJoinStudentAsync({
          users: checkedValues,
          programId,
        });
        await queryClient.invalidateQueries({
          queryKey: ['students', programId],
        });
        setOpen(false);
        console.log(response);
      }
    }
  };
  return (
    <Modal show={open} onClose={() => setOpen(false)}>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <Modal.Header>
          <span className="text-lg font-semibold">{title}</span>
        </Modal.Header>
        <Modal.Body>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {dataSchoolStudents && dataSchoolStudents.length > 0 ? (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        <span className="font-bold">No</span>
                        <a href="#">
                          <svg
                            className="w-3 h-3 ms-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </a>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        <span className="font-bold">Name</span>
                        <a href="#">
                          <svg
                            className="w-3 h-3 ms-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </a>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        <span className="font-bold">Email</span>
                        <a href="#">
                          <svg
                            className="w-3 h-3 ms-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </a>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        <span className="font-bold">No Hp</span>
                        <a href="#">
                          <svg
                            className="w-3 h-3 ms-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </a>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataSchoolStudents.map((el, index) => {
                    return (
                      <tr
                        key={el.userId}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{el.name}</td>
                        <td className="px-6 py-4">{el.email}</td>
                        <td className="px-6 py-4">{el.phone}</td>
                        <td className="px-6 py-4">
                          <Checkbox
                            value={el.userId}
                            id={el.userId}
                            name="student"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>Data is empty or Error ...</p>
            )}
            <div className="flex justify-between items-center w-full p-3">
              <div className="flex items-center gap-2 text-[#667085]">
                <label htmlFor="" className="block text-sm">
                  Showing
                </label>
                <select
                  id="pagination"
                  className="bg-gray-50 border max-w-[5rem] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option defaultChecked value={5}>
                    5
                  </option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                </select>
                <p className="w-full min-w-max text-sm">data out of 100</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-[#667085] text-sm">Data per page</p>
                <div className="flex items-center gap-2">
                  <button>
                    <IconLeft />
                  </button>
                  <button>
                    <IconRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="w-full justify-end">
          <Button
            onClick={() => setOpen(false)}
            type="button"
            outline
            className="border transition-none delay-0 border-[#F04438] text-[#F04438] outline-transparent bg-transparent enabled:hover:bg-[#F04438] enabled:hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color={'warning'}
            className="bg-[#FFC862] text-black"
          >
            Submit
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalSelectView;
