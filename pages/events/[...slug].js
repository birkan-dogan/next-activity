import { useRouter } from "next/router";
import { getFilteredEvents } from "../../data/dummy-data";

import EventList from "../../components/events/event-list";
import Button from "../../components/ui/button";

const FilteredEventsPage = () => {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return (
      <div>
        <p>Invalid filter, please adjust your filters</p>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </div>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div>
        <p>No events found for the chosen filter!</p>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
};
export default FilteredEventsPage;
