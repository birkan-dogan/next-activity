import { useRouter } from "next/router";
import { getEventById } from "../../data/dummy-data";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

const EventDetailPage = () => {
  // get event by id
  const router = useRouter();
  const id = router.query.eventId;

  const event = getEventById(id);

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
