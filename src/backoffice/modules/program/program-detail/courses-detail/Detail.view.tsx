'use client';

import React from 'react';
import Image from 'next/image';
import useDetail from './Detail';
import CourseSidebar from '@/backoffice/components/course-sidebar/CourseSidebar';

const DetailView = () => {
  const {
    selectedTab,
    isSidebarVisible,
    handleTabClick,
    renderTabContent,
    setIsSidebarVisible,
    handleSectionToggle,
    sections,
  } = useDetail();

  return (
    <div className="flex h-full">
      <CourseSidebar
        isSidebarVisible={isSidebarVisible}
        setIsSidebarVisible={setIsSidebarVisible}
        handleSectionToggle={handleSectionToggle}
        sections={sections}
        selectedTab={selectedTab}
        handleTabClick={handleTabClick}
      />

      {/* Main Content Area */}
      <div className={`p-6 ${isSidebarVisible ? 'w-3/4' : 'w-full pl-[3.5rem]'} relative`}>
        {!isSidebarVisible && (
          <button
            className="absolute top-4 left-4 p-2 bg-blue-500 text-white rounded-full z-10 flex items-center space-x-1"
            onClick={() => setIsSidebarVisible(true)}
          >
            <Image 
              src="/icons/manage-program/arrow-square-left.svg" 
              alt="Show Sidebar" 
              width={20}
              height={20}
              className="transform rotate-180" 
            />
          </button>
        )}
        <div className={`${!isSidebarVisible ? 'pl-12' : ''}`}>
          {renderTabContent()}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #1d4ed8;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: #f1f1f1;
        }
      `}</style>
    </div>
  );
};

export default DetailView;
