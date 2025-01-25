import React, { useState, useEffect } from 'react';
import CalendarComponent from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Card } from '@mui/material';
import { BiChevronRight } from 'react-icons/bi';
import moment from 'moment';
import '../../assets/css/content.css'

interface Event {
  title: string;
  description: string;
  start_date: string;
}

const Calendar: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const fetchedEvents = await response.json();
        setEvents(fetchedEvents);

        const todayString = moment().format('YYYY-MM-DD');
        const todayEvent = fetchedEvents.find((event: Event) =>
          moment(event.start_date).format('YYYY-MM-DD') === todayString
        );
        setSelectedEvent(todayEvent || null);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const onChange = (newDate: Date) => {
    setDate(newDate);
    const selectedDateString = moment(newDate).format('YYYY-MM-DD');
    
    const eventOnSelectedDate = events.find((event) => {
      return moment(event.start_date).format('YYYY-MM-DD') === selectedDateString;
    });
    setSelectedEvent(eventOnSelectedDate || null);
  };

  const tileClassName = ({ date, view }: { date: Date, view: string }) => {
    if (view === 'month') {
      const dateString = moment(date).format('YYYY-MM-DD');
      return events.some(event => moment(event.start_date).format('YYYY-MM-DD') === dateString) ? 'highlighted' : '';
    }
    return '';
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', fontFamily: 'Arial', backgroundColor: '' }}>
      <CalendarComponent
        onChange={onChange}
        value={date}
        tileClassName={tileClassName}
        className='calendar'
      />

      <p style={{ marginTop: 15, fontFamily: 'Arial' }}>Event Details</p>
      <Card
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: '14px',
          fontFamily: 'Arial',
          marginTop: 10,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          opacity: 0.8,
        }}
      >
        {selectedEvent ? (
          <Card style={{fontFamily: 'Arial', backgroundColor: '', padding: 4}}>
            <div style={{ backgroundColor: '', padding: 2, display: 'flex', justifyContent: 'space-between' }}>
              <p><strong>Date:</strong> <span style={{fontFamily: 'Arial'}}>{moment(selectedEvent.start_date).format('MMM Do YYYY')}</span></p>
              <BiChevronRight style={{ marginTop: 3, fontSize: 20 }} />
            </div>
            <div style={{ backgroundColor: '', padding: 2, display: 'flex', gap: 5, flexDirection: 'column', marginTop: 2 }}>
              <p><strong>Title:</strong> {selectedEvent.title}</p>
              <p className="event-description"><strong>Description:</strong> {selectedEvent.description}</p>
            </div>
          </Card>
        ) : (
          <p>No event for this date.</p>
        )}
      </Card>
    </div>
  );
};

export default Calendar;
