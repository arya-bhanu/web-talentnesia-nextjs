'use client';
import React, { useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import './style.css';

interface CalendarsEventProps {
  selectedDate: Date | null;
  agenda: Record<number, string>;
}

const CalendarsEvent: React.FC<CalendarsEventProps> = ({ selectedDate, agenda }) => {
  const calendarRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: { year: number; month: number; day: number }) => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return jsDate.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendar = new Calendar(calendarRef.current, {
        plugins: [timeGridPlugin, interactionPlugin],
        initialView: 'timeGridDay',
        selectable: true,
        droppable: true,
        editable: true,
        allDaySlot: false,
        titleFormat: function(date) {
          return formatDate(date.date);
        },
        headerToolbar: {
          left: 'agendaButton',
          end: 'title'
        },
        customButtons: {
          agendaButton: {
            text: "Today's Agenda",
            click: () => {
              calendar.gotoDate(new Date());
            },
          },
        },
        slotLabelFormat: { hour: 'numeric', hour12: true },
        select: function(info) {
          const title = prompt('Enter Event Title:');
          const description = prompt('Enter Event Description:');
          if (title) {
            calendar.addEvent({
              title,
              extendedProps: {
                description,
              },
              start: info.start,
              end: info.end,
              className: 'custom-event',
            });
          }
          calendar.unselect();
        },
        events: selectedDate
          ? [
              {
                title: agenda[selectedDate.getDate()] || 'No Event',
                start: selectedDate.toISOString(),
                className: 'custom-event',
              },
            ]
          : [],
        eventContent: function(arg) {
          return {
            html: `
              <div class="custom-event-content">
                <div class="custom-event-time">${arg.timeText}</div>
                <div class="custom-event-title">${arg.event.title}</div>
                <div class="custom-event-description">${arg.event.extendedProps.description || ''}</div>
              </div>
            `,
          };
        },
        eventClick: function(info) {
          const deleteEvent = confirm(`Do you want to delete the event "${info.event.title}"?`);
          if (deleteEvent) {
            info.event.remove();
          }
        },
      });

      calendar.render();

      return () => {
        calendar.destroy();
      };
    }
  }, [selectedDate, agenda]);

  return (
    <div className="calendar-event-container">
      <div id="mycalendar" ref={calendarRef}></div>
    </div>
  );
};

export default CalendarsEvent;
