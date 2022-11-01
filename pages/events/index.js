import { getAllEvents } from "../../data/dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";

const AllEventsPage = () => {
  const events = getAllEvents();
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullpath = `/events/${year}/${month}`; // the slug route will be triggered
    router.push(fullpath);
  };

  return (
    <div>
      <EventsSearch search={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
};
export default AllEventsPage;
