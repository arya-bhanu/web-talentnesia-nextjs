import { Tabs } from "flowbite-react";
import { IconType } from "react-icons";
import React from "react";

interface TabItem {
  title: string;
  content: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  icon?: IconType | null;
}

interface TabFlexProps {
  tabs: TabItem[];
}

export function TabFlex({ tabs }: TabFlexProps) {
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
      <Tabs aria-label="Tabs with underline" variant="underline" className="custom-tabs">
        {tabs.map((tab, index) => (
          <Tabs.Item
            key={index}
            title={tab.title}
            active={tab.active}
            disabled={tab.disabled}
            icon={tab.icon ? tab.icon : undefined}
            className="custom-tab-item"
          >
            {tab.content}
          </Tabs.Item>
        ))}
      </Tabs>
    </>
  );
}
