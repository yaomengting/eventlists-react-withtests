import { render } from "@testing-library/react";
import EventsContextProvider from "./EventsContextProvider";
import { useContext } from "react";
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn()
}));
describe("EventsContextProvider component", () => {
  let mockFetch;
  const addNewEvent = jest.fn((newEvent) => {
    fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    });
  });
  beforeEach(() => {
    mockFetch = jest.spyOn(global, 'fetch').mockResolvedValue({ json: () => Promise.resolve() });;
    useContext.mockImplementation(() => ({addNewEvent}));
  })

  afterEach(() => {
    mockFetch.mockRestore();
  })
 
  test('add new event', () => {
    const newEvent = {
      id: '123',
      eventName: 'new event',
      startDate: '04-08-2024',
      endDate: '04-18-2024'
    }
    render(<EventsContextProvider />);
     addNewEvent(newEvent)

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/events');
  })
 
})