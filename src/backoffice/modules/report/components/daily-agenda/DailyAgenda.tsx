import React from 'react';
import { Card } from 'flowbite-react';

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

interface DailyAgendaProps {
  date: Date;
  events: Event[];
}

const DailyAgenda: React.FC<DailyAgendaProps> = ({ date, events }) => {
  const filteredEvents = events.filter(
    event => event.start.toDateString() === date.toDateString()
  );

  return (
    <Card className="w-full md:w-1/2 p-4">
      <h2 className="text-xl font-bold mb-4">Today's Agenda</h2>
      <p className="text-sm text-gray-500 mb-4">
        {date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
      <div className="space-y-4">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-blue-500 text-white p-4 rounded-lg">
            <h3 className="font-bold">{event.title}</h3>
            <p className="text-sm">
              {event.start.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} -{' '}
              {event.end.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-sm">Mentoring Pengenalan UIUX</p> {/* Additional Description */}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DailyAgenda;
