'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { sidebarData } from './sidebar.data';
import './sidebar.style.css';

const SidebarView = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeSubIndex, setActiveSubIndex] = useState<number | null>(null);

  const handleItemClick = (index: number, hasLinks?: boolean) => {
    setActiveIndex(index);
    setActiveSubIndex(null);
    if (hasLinks) {
      setExpandedIndex(expandedIndex === index ? null : index);
    }
  };

  const handleSubItemClick = (subIndex: number) => {
    setActiveSubIndex(subIndex);
  };

  return (
    <aside
      id="icon-sidebar"
      className="fixed top-0 left-0 z-50 w-64 h-screen bg-[#FFFFFF] shadow-md overflow-y-auto"
      aria-label="Sidebar"
    >
      <div className="flex flex-col items-center py-4 px-3">
        <Image
          src="/icons/backoffice-logo-company.svg"
          alt="logo image"
          width={144}
          height={48}
          className=""
        />
      </div>
      <div className="px-3 pb-4">
        <ul className="space-y-2 font-medium">
          {sidebarData.map((item, index) => (
            <li key={index}>
              {item.links ? (
                <div className="group">
                  <button
                    type="button"
                    onClick={() => handleItemClick(index, true)}
                    className={`flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-100 ${
                      activeIndex === index ? 'text-[#219EBC]' : 'text-gray-900'
                    }`}
                  >
                    <div className="flex items-center">
                      <Image
                        src={item.icon || ''}
                        alt={`${item.title} icon`}
                        width={20}
                        height={20}
                        className="mr-3"
                        style={{
                          filter:
                            activeIndex === index
                              ? 'brightness(0) saturate(100%) invert(49%) sepia(85%) saturate(433%) hue-rotate(144deg) brightness(91%) contrast(88%)'
                              : 'none',
                        }}
                      />
                      <span className="ml-3">{item.title}</span>
                    </div>
                    <Image
                      src="/icons/sidebar/arrow-up.svg"
                      alt="Toggle arrow"
                      width={8}
                      height={8}
                      className="transition-transform"
                      style={{
                        transform:
                          expandedIndex === index
                            ? 'rotate(0deg)'
                            : 'rotate(180deg)',
                        filter:
                          expandedIndex === index
                            ? 'brightness(0) saturate(100%) invert(49%) sepia(85%) saturate(433%) hue-rotate(144deg) brightness(91%) contrast(88%)'
                            : 'none',
                      }}
                    />
                  </button>
                  <ul
                    className={`${expandedIndex === index ? 'block' : 'hidden'} mt-2 space-y-2`}
                  >
                    {item.links.map((link, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={link.link}
                          onClick={() => handleSubItemClick(subIndex)}
                          className={`flex items-center p-2 pl-8 rounded-lg hover:bg-gray-100 ${
                            activeSubIndex === subIndex
                              ? 'text-[#219EBC]'
                              : 'text-gray-700'
                          }`}
                        >
                          <Image
                            src="/icons/sidebar/point.svg"
                            alt="Point icon"
                            width={8}
                            height={8}
                            className="mr-2"
                            style={{
                              filter:
                                activeSubIndex === subIndex
                                  ? 'brightness(0) saturate(100%) invert(49%) sepia(85%) saturate(433%) hue-rotate(144deg) brightness(91%) contrast(88%)'
                                  : 'none',
                            }}
                          />
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  href={item.path || '#'}
                  onClick={() => handleItemClick(index)}
                  className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${
                    activeIndex === index ? 'text-[#219EBC]' : 'text-gray-900'
                  }`}
                >
                  <Image
                    src={item.icon || ''}
                    alt={`${item.title} icon`}
                    width={20}
                    height={20}
                    className={`mr-3 ${activeIndex === index ? 'filter invert' : ''}`}
                    style={{
                      filter:
                        activeIndex === index
                          ? 'brightness(0) saturate(100%) invert(49%) sepia(85%) saturate(433%) hue-rotate(144deg) brightness(91%) contrast(88%)'
                          : 'none',
                    }}
                  />
                  <span className="ml-3">{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SidebarView;
