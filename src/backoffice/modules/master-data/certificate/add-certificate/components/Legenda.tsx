import React, { useState, useEffect } from 'react';

const Legenda = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isSidebarOpen && !(event.target as Element).closest('.sidebar')) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <div className="relative">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)}></div>
      )}
      <div
        className={`sidebar fixed top-0 right-0 bottom-0 z-50 w-80 bg-white border-l border-gray-200 pt-7 pb-10 overflow-y-auto transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } dark:bg-neutral-800 dark:border-neutral-700`}
      >
        <div className="px-6 flex justify-between items-center">
          <a className="flex-none font-semibold text-xl text-black dark:text-white" href="#" aria-label="Brand">
            Legenda
          </a>
          <button
            type="button"
            className="text-gray-800 dark:text-white"
            aria-label="Close Sidebar"
            onClick={toggleSidebar}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <nav className="p-6 w-full flex flex-col space-y-1.5">
          <ul>
            <li>
              <a className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:text-white" href="#">
                First Name
              </a>
              <span className='text-sm'>
                {"<<firstName>>"}
              </span>
            </li>
            <br/>
            <li>
              <a className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:text-white" href="#">
                Age
              </a>
              <span className='text-sm'>
                {"<<Age>>"}
              </span>
            </li>
            <br/>
            <li>
              <a className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:text-white" href="#">
                Last Name
              </a>
              <span className='text-sm'>
                {"<<lastName>>"}
              </span>
            </li>
            
          </ul>
        </nav>
      </div>

      <button
        type="button"
        className="fixed top-28 right-4 z-60 p-2 rounded-md text-gray-800 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
  );
};

export default Legenda;