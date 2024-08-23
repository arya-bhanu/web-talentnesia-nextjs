import React, { useState } from 'react';
import IconLeft from '@/../public/icons/btn-left.svg';
import IconRight from '@/../public/icons/btn-right.svg';
import Image from 'next/image';
import Search from '@/../public/icons/iconamoon_search-bold.svg';
import { scoreData, columns, questions } from './exam.data';
import { DataTable } from '@/backoffice/components/data-table';

const Exam: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questionsPerPage = 5;

  const handleNextQuestion = () => {
    if (currentQuestionIndex + questionsPerPage < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + questionsPerPage);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - questionsPerPage);
    }
  };

  const renderQuestions = () => {
    const start = currentQuestionIndex;
    const end = Math.min(
      currentQuestionIndex + questionsPerPage,
      questions.length,
    );
    return (
      <>
      <h1 className="text-xl font-bold mb-4">Questions</h1>
        {questions.slice(start, end).map((q, index) => (
          <div
            key={q.no}
            className="border border-gray-300 p-4 mb-4 rounded-lg"
          >
            <p className="text-base font-normal">
              {start + index + 1}. {q.question}
            </p>
          </div>
        ))}
      </>
    );
  };

  const renderContent = () => {
    return (
      <>
        {renderQuestions()}
         <div className="flex justify-end items-center mt-4 mb-4">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="p-2 rounded-lg disabled:opacity-50"
              >
                <IconLeft />
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={
                  currentQuestionIndex + questionsPerPage >= questions.length
                }
                className="p-2 rounded-lg disabled:opacity-50"
              >
                <IconRight />
              </button>
            </div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Scores</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-md bg-white text-black"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 border-none"/>
          </div>
        </div>
        {scoreData.length === 0 ? (
          <div className="flex flex-col items-center mt-8">
            <Image
              src="/img/course-sidebar/No results.svg"
              alt="No results"
              width={80}
              height={80}
            />
            <p className="mt-4 text-gray-500">
              No scores have been entered yet
            </p>
          </div>
        ) : (
          <div>
            <DataTable
              columns={columns}
              data={scoreData}
              filter={{ Filter: filter, setFilter: setFilter }}
            />
          </div>
        )}
      </>
    );
  };

  return <div>{renderContent()}</div>;
};

export default Exam;
