// import { Card } from '@mui/material';
import { Card } from '@mui/material';
import React, { useState } from 'react';
import CalendarComponent from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { BiChevronRight } from 'react-icons/bi';

const Calendar: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  const onChange = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '', fontFamily: 'Arial' }}>
      {/* <h3>Calendar</h3> */}
      <CalendarComponent
        onChange={onChange}
        value={date}
      />
      <p style={{marginTop: 15, fontFamily: 'Arial'}}>All Event</p>
      <Card style={{display: 'flex', backgroundColor: '', padding: '2px 4px 2px 6px', flexDirection: 'column', fontSize: '14px', fontFamily: 'Arial', marginTop: 20, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', opacity: 0.8 }}>
        <div style={{backgroundColor: '', padding: 2, display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}>
          <p>Date</p>
          <BiChevronRight style={{marginTop: 3, fontSize: 20}}/>
        </div>
        <div style={{backgroundColor: '', padding: 2, display: 'flex', gap: 5, flexDirection: 'column', marginTop: 2}}>
          <p>Title: </p>
          <p>Description:</p>
        </div>
      </Card>
    </div>
  );
};

export default Calendar;
