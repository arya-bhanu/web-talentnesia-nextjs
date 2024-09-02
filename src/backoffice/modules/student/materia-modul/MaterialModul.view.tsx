'use client';

import React from 'react';
import Image from 'next/image';
import useMaterialModul from './MaterialModul';

const MaterialModulView: React.FC = () => {
  const {
    selectedTab,
    isSidebarVisible,
    handleTabClick,
    setIsSidebarVisible,
    handleSectionToggle,
    sections,
    selectedContent,
  } = useMaterialModul();

  return (
    <div className="flex h-full">
      {isSidebarVisible && (
        <div className="relative w-1/4 bg-gray-50 border-r h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar">
          <div className="sticky top-0 z-10 flex items-center justify-between bg-gray-50 py-4 w-full border-b border-gray-200 px-4">
            <h2 className="text-xl font-semibold">Module</h2>
            <button
              className="w-5 h-5 cursor-pointer text-gray-600"
              onClick={() => setIsSidebarVisible(false)}
            >
              <img src="/icons/manage-program/arrow-square-left.svg" alt="Hide Sidebar" />
            </button>
          </div>
          <div className="p-4">
            {sections.map((section) => (
              <div key={section.id} className="mb-4">
                <h3
                  className="font-semibold text-lg mb-1 cursor-pointer flex items-center justify-between"
                  onClick={() => handleSectionToggle(section.id)}
                >
                  <span>{section.title}</span>
                  <Image
                    src="/icons/manage-program/arrow-up.svg"
                    alt="Toggle arrow"
                    width={20}
                    height={20}
                    className="transition-transform"
                    style={{
                      transform: section.isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                      filter: section.isOpen
                        ? 'brightness(0) saturate(100%) invert(49%) sepia(85%) saturate(433%) hue-rotate(144deg) brightness(91%) contrast(88%)'
                        : 'none',
                    }}
                  />
                </h3>
                {!section.isOpen && (
                  <div className="text-sm text-gray-500 mb-2">
                    {section.duration} min  {section.tabs.length} curriculum
                  </div>
                )}
                {section.isOpen && (
                  <ul className="space-y-2">
                    {section.tabs.map((tab) => (
                      <li
                        key={tab.id}
                        className={`flex items-center justify-between space-x-2 p-2 rounded-md cursor-pointer
                          ${selectedTab === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}
                        `}
                        onClick={() => handleTabClick(tab.id)}
                      >
                        <div className="flex items-center space-x-2">
                          <img
                             src={`/icons/${tab.iconId === 1 ? 'play-circle' : tab.iconId === 2 ? 'book' : tab.iconId === 3 ? 'edit-2' : tab.iconId === 4 ? 'videocam' : 'assignment'}.svg`}
                            alt={`${tab.label} icon`}
                            className="w-5 h-5"
                            style={{
                              filter: selectedTab === tab.id
                                ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%)'
                                : 'brightness(0) saturate(100%) invert(49%) sepia(85%) saturate(433%) hue-rotate(144deg) brightness(91%) contrast(88%)'
                            }}
                          />
                          <span>{tab.label}</span>
                        </div>
                        <img
                          src="/icons/manage-program/clipboard.svg"
                          className={`w-5 h-5 ${selectedTab === tab.id ? 'filter invert' : ''}`}
                          alt="Clipboard Icon"
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

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
        {selectedContent} 
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default MaterialModulView;
