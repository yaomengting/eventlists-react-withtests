import React, { createContext, useEffect, useReducer } from 'react';

export const EventsContext = createContext();

const initialState = {
  isAddEventVisible: false,
  events: [],
}

function eventsReducer(state, action){
  switch(action.type){
    case 'SET_EVENTS':
      return { ...state, events: action.payload};
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload], isAddEventVisible: false};
    case 'UPDATE_EVENT':
      return { ...state, events: state.events.map(event => event.id === action.payload.id? action.payload: event) };
    case 'DELETE_EVENT':
      return { ...state, events: state.events.filter(event => event.id !== action.payload.id)};
    case 'HIDE_ADD_EVENT':
      return {...state, isAddEventVisible: false};
    case 'SHOW_ADD_EVENT':
      return  {...state, isAddEventVisible: true};
  }
}

export default function EventsContextProvider ({ children }) {
 const [state, dispatch] = useReducer(eventsReducer, initialState);

  useEffect(() => {
    fetch('http://localhost:3000/events')
      .then((res) => res.json())
      .then(data => dispatch(
        {
          type: 'SET_EVENTS',
          payload: data
        }
      ));
  }, []);

  const addNewEvent = (newEvent) => {
    fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    })
    .then((res) => res.json())
    .then(newEvent => dispatch({
      type: 'ADD_EVENT',
      payload: newEvent
    }));
  }

  const updateEvent = (updatedEvent) => {
    fetch(`http://localhost:3000/events/${updatedEvent.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent),
    })
    .then((res) => res.json())
    .then(updatedEvent => dispatch({
      type: 'UPDATE_EVENT',
      payload: updatedEvent
    }));
  }

  const deleteEvent = (deletedEvent) => {
    fetch(`http://localhost:3000/events/${deletedEvent.id}`,{
      method: 'DELETE',
    })
    .then(() => dispatch({
      type: 'DELETE_EVENT',
      payload: deletedEvent
    }));
  }

  const hideAddEventRow = () => {
    dispatch({ type: 'HIDE_ADD_EVENT' });
  }

  const showAddEventRow = () => {
    dispatch({ type: 'SHOW_ADD_EVENT' });
  }

  return (
    <EventsContext.Provider value={{
      isAddEventVisible: state.isAddEventVisible,
      events: state.events,
      addNewEvent,
      updateEvent,
      deleteEvent,
      hideAddEventRow,
      showAddEventRow
    }}>
      {children}
    </EventsContext.Provider>
  );
};