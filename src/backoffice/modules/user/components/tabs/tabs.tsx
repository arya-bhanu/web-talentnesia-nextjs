import React from 'react';

interface TabFlexProps {
  tabs: {
    title: string;
    content: React.ReactNode;
    active: boolean;
  }[];
  onTabChange?: (tabTitle: string) => void;
}

export const TabFlex: React.FC<TabFlexProps> = ({ tabs, onTabChange }) => {
  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 ${
              tab.active
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => onTabChange && onTabChange(tab.title)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.find((tab) => tab.active)?.content}
      </div>
    </div>
  );
};
