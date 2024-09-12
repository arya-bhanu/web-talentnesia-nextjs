import React from 'react';
import { legendaItems } from './Legenda.data';
import './Legenda.css';  

const Legenda = () => {
  return (
    <div className="h-[40rem] flex flex-col overflow-hidden">
      <div className="px-6 py-4 bg-white z-10">
        <h2 className="font-semibold text-xl text-black dark:text-white">Legenda</h2>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <nav className="p-6 w-full">
          <ul className="space-y-4">
            {legendaItems.map((item, index) => (
              <li key={index} className="space-y-2">
                <div className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg dark:bg-neutral-700 dark:text-white">
                  {item.label}
                </div>
                <span className='text-xs block mt-2'>
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Legenda;