'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PersonalNotesCard from './components/personal-notes-card/PersonalNotesCard';
import { PersonalNoteProps, ApiResponse } from './personalNotes.type';
import Search from '@/../public/icons/iconamoon_search-bold.svg';
import Add from '@/../public/icons/add.svg';
import { personalNoteAPI } from './api/personalNotesApi';

export interface PersonalNotesViewProps {
  initialNotes: PersonalNoteProps[];
}

const PersonalNotesView: React.FC<PersonalNotesViewProps> = ({ initialNotes }) => {
  const [notes, setNotes] = useState<PersonalNoteProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [columns, setColumns] = useState(3);
  const [isClient, setIsClient] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  const fetchNotes = useCallback(async (page: number) => {
    const response = await personalNoteAPI.get(page);
    if (response && response.success) {
      const newNotes = response.data.items;
      setNotes(prevNotes => page === 1 ? newNotes : [...prevNotes, ...newNotes]);
      setHasMore(response.data.meta.currentPage < response.data.meta.lastPage);
      setCurrentPage(response.data.meta.currentPage);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    fetchNotes(1);

    const handleResize = () => {
      if (window.innerWidth < 640) setColumns(1);
      else if (window.innerWidth < 1024) setColumns(2);
      else setColumns(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fetchNotes]);

  const handleLoadMore = () => {
    if (hasMore) {
      fetchNotes(currentPage + 1);
    }
  };

  const filteredNotes = notes ? notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.body.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const getColumnNotes = (col: number) => {
    return filteredNotes.filter((_, index) => index % columns === col);
  };

  const handleAddNewNote = () => {
    setIsNavigating(true);
    setTimeout(() => {
      router.push('/student/personal-notes/add-new-notes');
    }, 300);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setNotes(items);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className={`p-4 md:px-4 lg:px-6 transition-opacity duration-300 ${isNavigating ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col md:flex-row justify-between items-center font-poppins mb-7">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              placeholder="Search ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={handleAddNewNote}
          className="flex items-center focus:outline-none text-[#323232] bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-transparent font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
        >
          <Add />
          <span className="text-black-lg font-semibold">New Notes</span>
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10`}>
          {Array.from({ length: columns }).map((_, columnIndex) => (
            <Droppable key={columnIndex} droppableId={`column-${columnIndex}`}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-10"
                >
                  {getColumnNotes(columnIndex).map((note, index) => (
                    <Draggable key={note.id} draggableId={note.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <PersonalNotesCard {...note} onDelete={handleDeleteNote} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      {hasMore && (
        <button onClick={handleLoadMore} className="mt-4 w-full text-center">
          Load More
        </button>
      )}
    </div>
  );
};

export default PersonalNotesView;
