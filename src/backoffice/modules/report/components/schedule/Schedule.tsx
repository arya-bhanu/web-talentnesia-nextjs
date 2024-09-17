'use client';
import React, { useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import './schedule.style.css'; // Assuming you have custom CSS for the calendar
import { CalendarsEventProps } from './schedule.type';
import usePermission from '@/backoffice/components/permission-granted/usePermission';

const CalendarsEvent: React.FC<CalendarsEventProps> = ({
  selectedDate,
  agenda,
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const permission = usePermission;
  useEffect(() => {
    if (calendarRef.current) {
      const calendar = new Calendar(calendarRef.current, {
        plugins: [timeGridPlugin, interactionPlugin],
        initialView: 'timeGridDay',
        selectable: true,
        droppable: true,
        editable: true,
        allDaySlot: false,
        headerToolbar: {
          left: '',
          center: '',
          right: '',
        },
        slotLabelFormat: { hour: 'numeric', hour12: true },
        select: function (info) {
          if (permission('report.agenda.add')) {
            return;
          }
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
        eventContent: function (arg) {
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
        eventClick: function (info) {
          if (permission('report.agenda.delete', true)) {
            return;
          }
          const deleteEvent = confirm(
            `Do you want to delete the event "${info.event.title}"?`,
          );
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
    <>
      <div className="calendar-event-container">
        <div id="mycalendar" ref={calendarRef}></div>
      </div>
    </>
  );
};

export default CalendarsEvent;
