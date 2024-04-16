import { fireEvent, render, screen } from "@testing-library/react";
import React, { useContext } from "react";
import EventsTable from "./EventsTable";

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn()
}));

describe('EventsTable component', ()=>{
  const addNewEvent = jest.fn();
  const hideAddEventRow = jest.fn();
  const mockEvents = [
    {id: '034',
    eventName: 'mock event 1',
    startDate: '04-08-2024',
    endDate: '04-18-2024'
  },
  {id: '094',
    eventName: 'mock event 2',
    startDate: '04-08-2024',
    endDate: '04-18-2024'
  },
  ]
  beforeEach(() => {
    useContext.mockImplementation(() => ({
      events: mockEvents,
      isAddEventVisible: true,
      addNewEvent,
      hideAddEventRow,
    }));
  });

  test("triggers addNewEvent when save button is clicked", ()=>{
    render(<EventsTable />);
    const eventNameInput = screen.getByPlaceholderText('Event Name');
    const startDateInput = screen.getByLabelText('Start Date');
    const endDateInput = screen.getByLabelText('End Date');
    const saveButtonElement = screen.getByRole('button', { name: /save/i });
    fireEvent.change(eventNameInput, { target: { value: 'New Event' } });
    fireEvent.change(startDateInput, { target: { value: '2022-03-01' } });
    fireEvent.change(endDateInput, { target: { value: '2022-03-02' } });
    fireEvent.click(saveButtonElement);

    expect(addNewEvent).toHaveBeenCalledWith({
      eventName: 'New Event',
      startDate: '2022-03-01',
      endDate: '2022-03-02',
      id: expect.any(String),
    });
  })


  
})