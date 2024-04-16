// import { render, screen } from "@testing-library/react";
// import EventsContextProvider from "./EventsContextProvider";

// describe("EventsContextProvider component", () => {
//   global.fetch = jest.fn().mockResolvedValueOnce({
//     json: () => Promise.resolve([{
//       id: '034',
//       eventName: 'mock event 1',
//       startDate: '04-08-2024',
//       endDate: '04-18-2024'
//     },
//     {
//       id: '094',
//       eventName: 'mock event 2',
//       startDate: '04-08-2024',
//       endDate: '04-18-2024'
//     }])
//   })

//   test('renders events if get request succeeds', async () => {
    
//     render(<EventsContextProvider />)
//     const event1 = await screen.findByText('mock event 1');
//     const event2 = await screen.findByText('mock event 2');

//     expect(event1).toBeInTheDocument();
//     expect(event2).toBeInTheDocument();

//   })
// })