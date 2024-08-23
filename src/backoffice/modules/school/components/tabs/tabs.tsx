import React from 'react';

interface TabItem {
  title: string;
  content: React.ReactNode;
}

interface TabFlexProps {
  tabs: TabItem[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function TabFlex({ tabs, activeIndex, setActiveIndex }: TabFlexProps) {
  return (
    <div>
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 text-sm font-medium ${
              index === activeIndex
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'border-b-2 border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-200'
            } focus:outline-none`} 
            onClick={() => setActiveIndex(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
}
