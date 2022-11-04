import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";

const AllEventsPage = (props) => {
  // const events = getAllEvents();
  const { events } = props;
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

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: { events: events },
    revalidate: 1800,
  };
};
