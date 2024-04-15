import { render, screen } from "@testing-library/react";
import AddEventButton from "./AddEventButton"
import React, { useContext } from "react";

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn()
}));

describe("AddEventButton component", ()=>{
  test('renders Add New Event button', () =>{
    useContext.mockImplementation(()=>({
      showAddEventRow: jest.fn(),
    }))
    render(<AddEventButton />);

    const addNewEventButton = screen.getByRole('button', {name: 'Add New Event'});
    expect(addNewEventButton).toBeInTheDocument();
  })
})