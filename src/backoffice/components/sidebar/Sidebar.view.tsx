'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { sidebarData } from './sidebar.data';
import './sidebar.style.css';
import { SidebarViewProps } from './sidebar.type';

const SidebarView: React.FC<SidebarViewProps> = ({
  isSidebarOpen,
  toggleSidebar,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeSubIndex, setActiveSubIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isOverSubmenu, setIsOverSubmenu] = useState(false);
  const [submenuTimer, setSubmenuTimer] = useState<NodeJS.Timeout | null>(null);

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

  const handleItemHover = (
    index: number,
    event: React.MouseEvent<HTMLLIElement>,
  ) => {
    if (!isSidebarOpen) {
      if (submenuTimer) clearTimeout(submenuTimer);
      setHoveredIndex(index);
      const itemRect = event.currentTarget.getBoundingClientRect();
      setSubmenuPosition({
        top: itemRect.top,
        left: itemRect.right,
      });
    }
  };

  const handleItemLeave = () => {
    if (submenuTimer) clearTimeout(submenuTimer);
    const timer = setTimeout(() => {
      if (!isOverSubmenu) {
        setHoveredIndex(null);
      }
    }, 300);
    setSubmenuTimer(timer);
  };

  const handleSubmenuHover = (isOver: boolean) => {
    setIsOverSubmenu(isOver);
    if (!isOver) {
      const timer = setTimeout(() => {
        setHoveredIndex(null);
      }, 300);
      setSubmenuTimer(timer);
    } else {
      if (submenuTimer) clearTimeout(submenuTimer);
    }
  };

  return (
    <aside
      ref={sidebarRef}
      id="icon-sidebar"
      className={`fixed top-0 left-0 z-40 h-screen flex flex-col transition-all duration-300 ${
        isSidebarOpen ? 'w-64' : 'w-16'
      } ${isSidebarOpen ? 'bg-[#FFFFFF] shadow-md overflow-y-auto' : 'bg-transparent'}`}
      aria-label="Sidebar"
    >
      <div className="flex-shrink-0">
        <div
          className={`flex items-center justify-between py-4 px-3 ${isSidebarOpen ? '' : 'justify-center'}`}
        >
          <Link href="/" className="flex items-center">
            <div className="w-12 h-12 flex-shrink-0">
              <Image
                src="/icons/sidebar/logo.png"
                alt="logo image"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            {isSidebarOpen && (
              <span className="font-medium text-2xl md:text-3xl font-khand">
                talentnesia
              </span>
            )}
          </Link>
          <button
            onClick={toggleSidebar}
            className={`p-2 transition-all duration-300 rounded-full flex-shrink-0 ${
              isSidebarOpen ? 'bg-transparent' : ''
            }`}
            style={{ width: 38, height: 38 }}
          >
            <Image
              src="/icons/sidebar/arrow-sidebar.svg"
              alt="Toggle sidebar"
              width={38}
              height={38}
              className={`transition-transform transform ${isSidebarOpen ? '' : 'rotate-180'} flex-shrink-0`}
            />
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        <div className="px-3 pb-4">
          <ul className="space-y-2 font-medium">
            {sidebarData.map((item, index) => (
              <li
                key={index}
                onMouseEnter={(e) => handleItemHover(index, e)}
                onMouseLeave={handleItemLeave}
              >
                {item.links ? (
                  <div className="group">
                    <button
                      type="button"
                      onClick={() => handleItemClick(index, true)}
                      className={`flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-100 ${
                        activeIndex === index
                          ? 'text-[#219EBC]'
                          : 'text-[#667085]'
                      }`}
                    >
                      <div className="flex items-center">
                        <Image
                          src={item.icon || ''}
                          alt={`${item.title} icon`}
                          width={24}
                          height={24}
                          className="mr-3"
                          style={{
                            filter:
                              activeIndex === index
                                ? 'brightness(0) saturate(100%) invert(49%) sepia(85%) saturate(433%) hue-rotate(144deg) brightness(91%) contrast(88%)'
                                : 'none',
                          }}
                        />
                        {isSidebarOpen && (
                          <span className="ml-3">{item.title}</span>
                        )}
                      </div>
                      {isSidebarOpen && (
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
                      )}
                    </button>
                    {isSidebarOpen ? (
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
                                  : 'text-[#667085]'
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
                    ) : (
                      !isSidebarOpen &&
                      (hoveredIndex === index || isOverSubmenu) && (
                        <div
                          className="fixed bg-white shadow-md rounded-lg p-2 z-[9999]"
                          style={{
                            top: `${submenuPosition.top}px`,
                            left: '64px',
                            minWidth: '180px',
                            maxHeight: '70vh',
                            overflowY: 'auto',
                            fontSize: '0.8rem',
                          }}
                          onMouseEnter={() => handleSubmenuHover(true)}
                          onMouseLeave={() => handleSubmenuHover(false)}
                        >
                          <ul className="space-y-1">
                            {item.links.map((link, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  href={link.link}
                                  onClick={() => {
                                    handleSubItemClick(subIndex);
                                    setHoveredIndex(null);
                                  }}
                                  className={`block p-1.5 rounded-lg hover:bg-gray-100 ${
                                    activeSubIndex === subIndex
                                      ? 'text-[#219EBC]'
                                      : 'text-[#667085]'
                                  } whitespace-nowrap`}
                                >
                                  <span>{link.label}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.path || '#'}
                    onClick={() => handleItemClick(index)}
                    className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${
                      activeIndex === index
                        ? 'text-[#219EBC]'
                        : 'text-[#667085]'
                    }`}
                  >
                    <Image
                      src={item.icon || ''}
                      alt={`${item.title} icon`}
                      width={24}
                      height={24}
                      className={`mr-3 ${activeIndex === index ? 'filter invert' : ''}`}
                      style={{
                        filter:
                          activeIndex === index
                            ? 'brightness(0) saturate(100%) invert(49%) sepia(85%) saturate(433%) hue-rotate(144deg) brightness(91%) contrast(88%)'
                            : 'none',
                      }}
                    />
                    {isSidebarOpen && (
                      <span className="ml-3">{item.title}</span>
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default SidebarView;
