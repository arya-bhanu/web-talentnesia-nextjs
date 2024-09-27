'use client';
import React, { useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import './style.css';
import { Agenda } from '../../dashboardOperator.type';

interface CalendarsEventProps {
  selectedDate: Date | null;
  agenda: Agenda[];
}

const CalendarsEvent: React.FC<CalendarsEventProps> = ({
  selectedDate,
  agenda,
}) => {
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
    if (calendarRef.current && selectedDate) {
      const calendar = new Calendar(calendarRef.current, {
        plugins: [timeGridPlugin, interactionPlugin],
        initialView: 'timeGridDay',
        initialDate: selectedDate,
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
        events: agenda.map((item) => ({
          title: item.title,
          start: `${item.date}T${item.startTime}`,
          end: `${item.date}T${item.endTime}`,
          className: 'custom-event',
        })),
        eventContent: function (arg) {
          return {
            html: `
              <div class="custom-event-content">
                <div class="custom-event-time">${arg.timeText}</div>
                <div class="custom-event-title">${arg.event.title}</div>
              </div>
            `,
          };
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
