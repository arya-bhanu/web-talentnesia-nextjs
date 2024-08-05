import Link from 'next/link';
import React from 'react';
import { IChapter } from './chapter.type';
import Add from '../../../../../../public/icons/add.svg';

const ChapterView: React.FC<IChapter> = ({ className }) => {
  return (
    <section className={className}>
      <div className="flex items-center justify-between">
        <h2 className='font-poppins text-sm font-semibold text-[#323232]'>Chapter</h2>
        <Link
          href={'/backoffice/manage-modul/create/chapter'}
          className="flex items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        >
          <Add />
          <span className="text-black"> Add Modul</span>
        </Link>
      </div>
    </section>
  );
};

export default ChapterView;
