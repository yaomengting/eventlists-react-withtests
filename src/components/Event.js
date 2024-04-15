import { useState } from 'react'
import SaveButton from './buttons/SaveButton';
import DeleteButton from './buttons/DeleteButton';
import CancelButton from './buttons/CancelButton';
import EditButton from './buttons/EditButton';
import { useContext } from 'react';
import { EventsContext } from './store/EventsContextProvider';
function Event({ event }) {
  const [isEditing, setIsEditing] = useState(false)
  const [eventName, setEventName] = useState(event.eventName);
  const [startDate, setStartDate] = useState(event.startDate);
  const [endDate, setEndDate] = useState(event.endDate);
  const { updateEvent, deleteEvent} = useContext(EventsContext);
  function handleEdit() {
    setIsEditing(true);
  }

  function saveEditedEvent() {
    if (!eventName || !startDate || !endDate) {
      alert('All fields are required');
      return;
    }
    const editedEvent = { id: event.id, eventName, startDate, endDate };
    updateEvent(editedEvent);
    setIsEditing(false);
  }

  function handleDelete() {
    const deletedEvent = event;
    deleteEvent(deletedEvent);
  }
  function handleCancel() {
    setIsEditing(false);
    setEventName(event.eventName);
    setStartDate(event.startDate);
    setEndDate(event.endDate);
  }

  return (
    <>
      <tr>
        {isEditing ? (
          <>
            <td>
              <input type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)} />
            </td>
            <td>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </td>
            <td>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </td>
            <td>
              <SaveButton onClick={saveEditedEvent} />
              <CancelButton onClick={handleCancel} />
            </td>
          </>
        ) : (
          <>
            <td>{event.eventName}</td>
            <td>{event.startDate}</td>
            <td>{event.endDate}</td>
            <td>
              <EditButton onClick={handleEdit} />
              <DeleteButton onClick={handleDelete} />
            </td>
          </>
        )}

      </tr>

    </>
  )
}

export default Event;