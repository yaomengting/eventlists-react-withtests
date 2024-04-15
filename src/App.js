import AddEventButton from './components/AddEventButton';
import EventsTable from './components/EventsTable';
import EventsContextProvider from './components/store/EventsContextProvider';

function App() {
  return (
    <EventsContextProvider>
    <div>
      <AddEventButton />
      <EventsTable />
    </div>
    </EventsContextProvider>
  );
}

export default App;
