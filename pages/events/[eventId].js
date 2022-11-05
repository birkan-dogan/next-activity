// import { useRouter } from "next/router";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

import Head from "next/head";

const EventDetailPage = (props) => {
  // get event by id
  // const router = useRouter();
  // const id = router.query.eventId;

  const { selectedEvent } = props;

  const event = selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics event={event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </div>
  );
};

export default EventDetailPage;

// we definitely want to have some data on single event page right from the start because it has all the details for an event

// data on this page doesn't change all the time, so pre-generating sounds good

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30, // if a new request comes in and it's more than 30 seconds since the page was last generated, it will be generated again
  };
};

/*
this is a dynamic page and there is an infinite amount of possible pages that could be generated, Next.js doesn't know which eventId it should be pre-generated. That's why we need another function to tell Next.js which eventIds we have.
*/

export const getStaticPaths = async () => {
  // const events = await getAllEvents();
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: true,
  };
};
