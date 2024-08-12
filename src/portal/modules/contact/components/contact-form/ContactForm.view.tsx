import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import './contactForm.style.css';
import { ContactFormViewProps } from './contactForm.type';

export const ContactFormView: React.FC<ContactFormViewProps> = ({
  className,
  selectedIssue,
  onIssueChange,
  issues,
}) => {
  return (
    <section
      className={clsx(
        className + ' flex flex-col lg:items-start pt-5 md:pt-10',
      )}
    >
      <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-[#2B2E33]">
        Send Us a Message
      </h1>
      <p className="text-lg text-[#2B2E33] mt-4 mb-8">
        Join Talentnesia and unlock your full potential with our transformative
        learning experiences
      </p>
      <form className="w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <input
            type="text"
            placeholder="Enter your name here"
            className="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:ring-[#219EBC] focus:border-[#219EBC] sm:text-sm text-gray-600"
            required
          />
          <input
            type="email"
            placeholder="Enter your email here"
            className="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:ring-[#219EBC] focus:border-[#219EBC] sm:text-sm text-gray-600"
            required
          />
        </div>
        <div className="mt-4">
          <select
            className="mt-1 block w-full font-poppins px-3 py-2 border-b border-gray-300 focus:outline-none focus:ring-[#219EBC] focus:border-[#219EBC] sm:text-sm text-gray-600"
            value={selectedIssue}
            onChange={onIssueChange}
            required
          >
            <option value="" disabled>
              Select an issue
            </option>
            {issues.map((issue) => (
              <option
                key={issue.id}
                value={issue.id}
                className="hover:bg-[#1b8cb4] hover:text-white"
              >
                {issue.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <textarea
            placeholder="Message"
            className="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:ring-[#219EBC] focus:border-[#219EBC] sm:text-sm text-gray-600 resize-none"
            rows={4}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-[#00B3AD] text-white px-4 py-2 rounded-full mt-4 flex items-center justify-center space-x-2 hover:bg-[#008F8A]"
        >
          <span>Submit</span>
          <Image
            src="/img/contact/arrow-right.svg"
            alt="Arrow Right"
            width={15}
            height={15}
            className="text-white"
          />
        </button>
      </form>
    </section>
  );
};
