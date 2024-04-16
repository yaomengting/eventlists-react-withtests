import Event from './Event';
import React, { useState, useContext } from 'react';
import SaveButton from './buttons/SaveButton.js';
import CancelButton from './buttons/CancelButton.js';
import { EventsContext } from './store/EventsContextProvider';


function EventsTable() {
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { events, isAddEventVisible, addNewEvent, hideAddEventRow } = useContext(EventsContext);
  const handleSave = () => {
    if (!eventName || !startDate || !endDate) {
      alert('All fields are required');
      return;
    }
    const newEvent = { eventName, startDate, endDate, id: Date.now().toString() };
    addNewEvent(newEvent);
    setEventName('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <table>
      <thead>
        <tr className='table-head'>
          <th>Event</th>
          <th>Start</th>
          <th>End</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="event-list">
        {events && events.map((event) => (
          <Event key={event.id} event={event} />
        ))}
        {isAddEventVisible && (
          <tr >
            <td>
              <input type="text"
                placeholder="Event Name"
                aria-label="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)} />
            </td>
            <td>
              <input
              type="date"
              aria-label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            </td>
            <td> 
              <input
              type="date"
              aria-label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            </td>
            <td> 
            <SaveButton onClick={handleSave} />
            <CancelButton onClick={hideAddEventRow}/>
              </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default EventsTable;