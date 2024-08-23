import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PersonalNoteProps } from '../../personalNotes.type';

const PersonalNotesCard: React.FC<PersonalNoteProps> = ({ id, title, content, date, backgroundColor }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [bgColor, setBgColor] = useState(backgroundColor || '#FFFFFF');
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [content]);

  const handleColorChange = (color: string) => {
    setBgColor(color);
    setShowMenu(false);
  };

  return (
    <div 
      className={`rounded-[16px] shadow-md p-4 flex flex-col transition-all duration-500 ease-in-out w-full`}
      style={{ 
        backgroundColor: bgColor, 
        height: isExpanded ? `${contentHeight + 100}px` : '250px',
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg md:text-xl font-semibold truncate font-poppins">{title}</h3>
        <div className="relative">
          <button className="text-gray-500" onClick={() => setShowMenu(!showMenu)}>⋮</button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2 z-10 transition-opacity duration-300 ease-in-out opacity-100">
              <div className="flex justify-around">
                <button className="w-6 h-6 rounded-full border-black" style={{ backgroundColor: '#ECFDB1' }} onClick={() => handleColorChange('#ECFDB1')} />
                <button className="w-6 h-6 rounded-full" style={{ backgroundColor: '#C2E7F1' }} onClick={() => handleColorChange('#C2E7F1')} />
                <button className="w-6 h-6 rounded-full" style={{ backgroundColor: '#CAF6BE' }} onClick={() => handleColorChange('#CAF6BE')} />
                <button className="w-6 h-6 rounded-full" style={{ backgroundColor: '#F6BECA' }} onClick={() => handleColorChange('#F6BECA')} />
              </div>
            </div>
          )}
        </div>
      </div>
      <p 
        ref={contentRef}
        className={`text-sm md:text-md text-[#323232] overflow-hidden font-poppins transition-all duration-500 ease-in-out flex-grow`}
        style={{ maxHeight: isExpanded ? `${contentHeight}px` : '150px' }}
      >
        {content}
      </p>
      <div className="flex justify-between items-center mt-auto pt-2">
        <span className="text-xs md:text-sm text-gray-500">{date}</span>
        {content.length > 198 && (
          <button className="text-sm md:text-md text-[#323232] flex items-center" onClick={() => setIsExpanded(!isExpanded)}>
            <span>{isExpanded ? 'See less' : 'See more'}</span>
            <Image
              src="/icons/student/arrow-right.svg"
              alt="arrow"
              width={16}
              height={16}
              className={`ml-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonalNotesCard;
