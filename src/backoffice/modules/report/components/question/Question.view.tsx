import React from 'react';
import { IQuestionViewProps } from './question.type';
import Image from 'next/image';

const QuestionView: React.FC<IQuestionViewProps> = ({ questions }) => {
  return (
    <div className="w-full space-y-2">
      <h1 className="text-2xl font-bold">Question</h1>
      <div className="">
        {questions.map((question, index) => (
          <div key={index} className="rounded-lg p-3">
            <div className="flex">
              <span className="w-8 flex items-center align-middle font-lato text-semibold">
                {index + 1}
              </span>
              <div className="flex-1 border-2 p-4 rounded-xl">
                <p className="text-sm">{question.text}</p>
                {question.attachment && (
                  <div className="mt-2 flex items-center">
                    <a
                      href={question.attachment}
                      className="text-blue-500 text-sm flex items-center gap-2"
                    >
                      <Image alt='attachment' src='/icons/icon-pdf.svg' width={15} height={15} />
                      {question.attachmentName}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      <div className="flex justify-end gap-2 pr-3 pb-3">
        <button>
          <Image
            src="/icons/btn-left.svg"
            alt="Previous"
            width={34}
            height={34}
          />
        </button>
        <button>
          <Image
            src="/icons/btn-right.svg"
            alt="Previous"
            width={34}
            height={34}
          />
        </button>
      </div>
    </div>
      </div>
  );
};

export default QuestionView;
