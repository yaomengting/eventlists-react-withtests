import React from 'react';
import { useContext } from 'react';
import { EventsContext } from './store/EventsContextProvider';
function AddEventButton() {

 const {showAddEventRow} = useContext(EventsContext);
  return (<>
    <div className="addEvent">
      <button id="addEventButton" onClick={showAddEventRow}>
        Add New Event</button>
    </div>
   
  </>)
}

export default AddEventButton;