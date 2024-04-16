import { fireEvent, render, screen } from "@testing-library/react";
import Event from "./Event";
import React, { useContext } from "react";

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn()
}));

describe("Event component", () => {
  const updateEvent = jest.fn();
  const deleteEvent = jest.fn();

  const mockEvent = {
    id: '034',
    eventName: 'mock event',
    startDate: '04-08-2024',
    endDate: '04-18-2024'
  };

  beforeEach(() => {
    useContext.mockImplementation(() => ({
      updateEvent,
      deleteEvent
    })
    )
  });

  test('renders eventname, startdate and enddate', () => {
    render(<Event event={mockEvent} />);
    const eventNameElement = screen.getByText(mockEvent.eventName);
    expect(eventNameElement).toBeInTheDocument();
    const startDateElement = screen.getByText(mockEvent.startDate);
    expect(startDateElement).toBeInTheDocument();
    const endDateElement = screen.getByText(mockEvent.endDate);
    expect(endDateElement).toBeInTheDocument();
  })

  test('renders save button and cancel button when edit button is clicked', () => {
    render(<Event event={mockEvent} />);

    const editButtonElement = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButtonElement);

    const saveButtonElement = screen.getByRole('button', { name: /save/i });
    const cancelButtonElement = screen.getByRole('button', { name: /cancel/i });

    expect(saveButtonElement).toBeInTheDocument();
    expect(cancelButtonElement).toBeInTheDocument();

  })

})