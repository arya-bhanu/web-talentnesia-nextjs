import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PersonalNoteProps } from '../../personalNotes.type';
import { personalNoteAPI } from '../../api/personalNotesApi';

interface PersonalNotesCardProps extends PersonalNoteProps {
  onDelete: (id: string) => void;
}

const PersonalNotesCard: React.FC<PersonalNotesCardProps> = ({ id, title, body, color, onDelete }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [body]);

  const handleEdit = () => {
    router.push(`/student/personal-notes/edit-new-notes/?id=${id}`);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const isDeleted = await personalNoteAPI.delete(id);
    if (isDeleted) {
      setTimeout(() => onDelete(id), 500); // Wait for fade-out animation
    } else {
      setIsDeleting(false);
      console.error('Failed to delete note');
    }
  };

  return (
    <div 
      className={`rounded-[16px] shadow-md p-4 flex flex-col transition-all duration-500 ease-in-out w-full ${isDeleting ? 'opacity-0' : 'opacity-100'}`}
      style={{ 
        backgroundColor: color, 
        height: isExpanded ? `${contentHeight + 100}px` : '250px',
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg md:text-xl font-semibold truncate font-poppins">{title}</h3>
        <div className="relative">
          <button className="text-gray-500" onClick={() => setShowMenu(!showMenu)}>⋮</button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2 z-10 transition-opacity duration-300 ease-in-out opacity-100">
              <button className="w-full text-left py-1 px-2 hover:bg-gray-100" onClick={handleEdit}>Edit</button>
              <button className="w-full text-left py-1 px-2 hover:bg-gray-100 text-red-500" onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      </div>
      <div 
        ref={contentRef}
        className={`text-sm md:text-md text-[#323232] overflow-hidden font-poppins transition-all duration-500 ease-in-out flex-grow`}
        style={{ maxHeight: isExpanded ? `${contentHeight}px` : '150px' }}
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <div className="flex justify-between items-center mt-auto pt-2">
        <span className="text-xs md:text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
        {body.length > 198 && (
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
