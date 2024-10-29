import React from 'react';
import SidebarView from './Sidebar.view';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <>
      <div
        className={`${isSidebarOpen ? 'bg-gray-200' : 'bg-transparent'} transition-all duration-300 h-full w-64`}
      >
        <SidebarView
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        ;
      </div>
    </>
  );
};

export default Sidebar;
