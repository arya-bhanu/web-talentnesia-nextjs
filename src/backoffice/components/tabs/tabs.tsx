import React from 'react';
import { Tabs } from 'flowbite-react';
import { IconType } from 'react-icons';

export interface TabItem<T extends string> {
  title: string;
  content: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  icon?: IconType | null;
  type: T;
}

interface TabFlexProps<T extends string> {
  tabs: TabItem<T>[];
  onTabChange?: (tabType: T) => void;
}

export function TabFlex<T extends string>({
  tabs,
  onTabChange,
}: TabFlexProps<T>) {
  return (
    <>
      <style>
        {`
          /* Reset untuk menghilangkan semua default styling yang mungkin berpengaruh */
          button:focus {
            outline: none !important;
          }
          
          /* Menghapus efek default yang mungkin ditambahkan oleh Flowbite atau browser */
          button, input, select, textarea:focus {
            outline: none !important;
            box-shadow: none !important;
          }
        `}
      </style>
      <Tabs 
        aria-label="Tabs with underline" 
        variant="underline" 
        className="custom-tabs"
        onActiveTabChange={(tab) => {
          const activeTab = tabs[tab];
          if (activeTab) {
            onTabChange && onTabChange(activeTab.type);
          }
        }}
      >
        {tabs.map((tab, index) => (
          <Tabs.Item
            key={index}
            title={
              <div className="flex items-center justify-center px-4 py-2 text-sm font-medium text-center text-gray-700 rounded-t-lg hover:text-gray-900 focus:outline-none cursor-pointer w-full h-full">
                {tab.icon && <tab.icon className="mr-2 h-5 w-5" />}
                {tab.title}
              </div>
            }
            active={tab.active}
            disabled={tab.disabled}
          >
            {/* Content is rendered in the parent component */}
          </Tabs.Item>
        ))}
      </Tabs>
    </>
  );
}
