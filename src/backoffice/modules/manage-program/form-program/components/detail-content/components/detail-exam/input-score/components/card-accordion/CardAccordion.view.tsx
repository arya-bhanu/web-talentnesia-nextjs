import React from 'react';
import { flexRender } from '@tanstack/react-table';
import { Button, TextInput } from 'flowbite-react';
import IconLeft from '@/../public/icons/btn-left.svg';
import IconRight from '@/../public/icons/btn-right.svg';
import { CardAccordionViewProps } from './cardAccordion.type';
import './cardAccordion.style.css';

const CardAccordionView: React.FC<CardAccordionViewProps> = ({
  studentData,
  openAccordions,
  scores,
  tableInstance,
  toggleAccordion,
  handleScoreChange,
  calculateTotalScore,
}) => {
  const students = Array.isArray(studentData) ? studentData : [];
  console.log(studentData);
  console.log('students', students);
  return (
    <div className="mx-auto bg-white rounded-lg">
      {students.map((student) => (
        <div
          key={student.userId}
          className={`mb-4 border rounded-lg overflow-hidden hover:bg-[#FCFCFC] ${
            openAccordions.includes(student.userId) ? 'bg-[#FCFCFC]' : ''
          }`}
        >
          <div
            className="cursor-pointer p-4 hover:"
            onClick={() => toggleAccordion(student.userId)}
          >
            <div className="grid grid-cols-2 gap-x-8 mb-4">
              <div className="space-y-2">
                <p className="flex">
                  <span className="font-semibold text-[#858D9D] w-28">
                    Nama
                  </span>
                  <span className="mr-2">:</span>
                  <span className="color-[#323232] font-medium">
                    {student.name}
                  </span>
                </p>
                <p className="flex">
                  <span className="font-semibold text-[#858D9D] w-28">
                    Batas Akhir
                  </span>
                  <span className="mr-2">:</span>
                  <span className="color-[#323232] font-medium">
                    {/* End Date */}{"-"}
                  </span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex">
                  <span className="font-semibold text-[#858D9D] w-28">
                  Tgl Dikerjakan
                  </span>
                  <span className="mr-2">:</span>
                  <span className="color-[#323232] font-medium">
                    {/* Date Started */}{"-"}
                  </span>
                </p>
                {/* <p className="flex">
                  <span className="font-semibold text-[#858D9D] w-28">
                    Tipe
                  </span>
                  <span className="mr-2">:</span>
                  <span className="color-[#323232] font-medium">
                    {student.tipe}
                  </span>
                </p> */}
              </div>
            </div>
          </div>
          {openAccordions.includes(student.userId) && (
            <div className="transition-all duration-300 ease-in-out max-h-[1000px] opacity-100 overflow-hidden">
              <div className="border-t overflow-hidden">
              <table className="w-full">
                  <colgroup>
                    <col style={{ width: '45%' }} />
                    <col style={{ width: '45%' }} />
                    <col style={{ width: '10%' }} />
                  </colgroup>
                  <thead>
                    {tableInstance.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="p-2 py-2 text-left border-b"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {student.questions
                      .sort((a, b) => a.order - b.order)
                      .map((question) => (
                        <tr key={question.id}>
                          <td className="p-2 border-t">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: question.title,
                              }}
                            />
                          </td>
                          <td className="p-2 border-t">Jawaban siswa</td>
                          <td className="p-2 border-t">
                            <TextInput
                              type="number"
                              value={
                                scores[`${student.userId}-${question.id}`] || ''
                              }
                              onChange={(e) =>
                                handleScoreChange(
                                  student.userId,
                                  question.id,
                                  Number(e.target.value),
                                )
                              }
                              className="w-14 text-center"
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end gap-4 items-center p-4">
                <p className="font-semibold">
                  Total Nilai:{' '}
                  <label className="text-[#12B76A]">
                    {calculateTotalScore(student.userId)}
                  </label>
                </p>
                <Button
                  type="submit"
                  color={'warning'}
                  className="bg-[#FFC862] text-black"
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="flex justify-between items-center w-full p-3">
        <div className="flex items-center gap-2 text-[#667085]">
          <label htmlFor="" className="block text-sm">
            Showing
          </label>
          <select
            id="pagination"
            className="bg-gray-50 border max-w-[5rem] border-gray-300 text-gray-900 text-sm rounded-lg"
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
  );
};

export default CardAccordionView;
