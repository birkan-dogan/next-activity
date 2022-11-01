import { useRouter } from "next/router";
import { getFilteredEvents } from "../../data/dummy-data";

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
    return <p>Invalid filter, please adjust your filters</p>;
  }

  const filteredEvents = getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filter!</p>;
  }

  return (
    <div>
      <h1>filtered events</h1>
    </div>
  );
};
export default FilteredEventsPage;
