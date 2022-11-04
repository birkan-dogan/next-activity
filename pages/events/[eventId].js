// import { useRouter } from "next/router";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

import { getEventById, getAllEvents } from "../../helpers/api-util";

const EventDetailPage = (props) => {
  // get event by id
  // const router = useRouter();
  // const id = router.query.eventId;

  const { selectedEvent } = props;

  const event = selectedEvent;

  if (!event) {
    return <p>No event found!</p>;
  }
  return (
    <div>
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
  };
};

/*
this is a dynamic page and there is an infinite amount of possible pages that could be generated, Next.js doesn't know which eventId it should be pre-generated. That's why we need another function to tell Next.js which eventIds we have.
*/

export const getStaticPaths = async () => {
  const events = await getAllEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: false,
  };
};
