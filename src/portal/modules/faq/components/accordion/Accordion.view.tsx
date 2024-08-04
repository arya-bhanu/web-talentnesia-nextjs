import React from 'react';
import clsx from 'clsx';
import { AccordionViewProps } from './accordion.type';
import Image from 'next/image';

export const AccordionView: React.FC<AccordionViewProps> = ({
  accordionData,
  activeIndex,
  toggleAccordion,
}) => {
  return (
    <div>
      <div className="border-t border-gray-200"></div>
      {accordionData.map((item, index) => (
        <div key={index} className="border-b border-gray-200">
          <button
            className="w-full text-left py-4 px-6 flex justify-between items-center focus:outline-none pt-5"
            onClick={() => toggleAccordion(index)}
          >
            <span className="text-[#344054] font-poppins font-semibold text-base lg:text-lg">{item.question}</span>
            <Image
            src={'/icons/arrow-right.svg'}
            width={10}
            height={10}
            alt="arrow-right"
            className={clsx('w-4 h-4 transition-transform rotate-[-90deg] ml-2', activeIndex === index ? 'transform rotate-[180deg]' : '')}
            />
          </button>
          <div
            className={clsx('px-6 overflow-hidden transition-max-height', activeIndex === index ? 'max-h-screen' : 'max-h-0')}
          >
            <p className="py-4 text-[#455A64]">{item.answer}</p>
          </div>
        </div>
      ))}
      <div className="border-t border-gray-200"></div>
    </div>
  );
};
