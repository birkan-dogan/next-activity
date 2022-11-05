import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";

import Head from "next/head";

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
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evlove..."
        />
      </Head>
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
