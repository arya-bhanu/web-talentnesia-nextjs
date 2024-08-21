'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';

interface Event {
  id: number;
  title: string;
  date: string;
}

const CustomCalendarEvent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventTitle, setEventTitle] = useState<string>('');

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    if (selectedDate && eventTitle.trim()) {
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          id: Date.now(),
          title: eventTitle,
          date: format(selectedDate, 'yyyy-MM-dd'),
        },
      ]);
      setEventTitle('');
    }
  };

  const handleDeleteEvent = (id: number) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return (
    <div className="p-4">
      {/* Date Selector */}
      <div className="mb-4">
        <input
          type="date"
          onChange={(e) => handleDateClick(new Date(e.target.value))}
          className="p-2 border rounded"
        />
      </div>

      {/* Add Event */}
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Event Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button
          onClick={handleAddEvent}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Add Event
        </button>
      </div>

      {/* Event List */}
      <div className="bg-gray-100 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">
          Events on {selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '...'}
        </h2>
        {events
          .filter(
            (event) =>
              event.date ===
              (selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''),
          )
          .map((event) => (
            <div
              key={event.id}
              className="mb-2 flex justify-between items-center"
            >
              <span>{event.title}</span>
              <button
                onClick={() => handleDeleteEvent(event.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        {events.filter(
          (event) =>
            event.date ===
            (selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''),
        ).length === 0 && <p>No events found.</p>}
      </div>
    </div>
  );
};

export default CustomCalendarEvent;
