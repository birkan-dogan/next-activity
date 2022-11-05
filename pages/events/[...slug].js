import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-util";

import EventList from "../../components/events/event-list";
import Button from "../../components/ui/button";

import Head from "next/head";

const FilteredEventsPage = (props) => {
  // const router = useRouter();

  // const filterData = router.query.slug;

  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }

  // const filteredYear = +filterData[0];
  // const filteredMonth = +filterData[1];

  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`A list of filtered events `} />
    </Head>
  );

  if (props.hasError) {
    return (
      <div>
        {pageHeadData}
        <p>Invalid filter, please adjust your filters</p>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </div>
    );
  }

  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div>
        {pageHeadData}
        <p>No events found for the chosen filter!</p>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {pageHeadData}
      <EventList items={filteredEvents} />
    </div>
  );
};

export default FilteredEventsPage;

export const getServerSideProps = async (context) => {
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return {
      props: { hasError: true },
      notFound: true,
      // redirect: {
      //   destination: "/",
      // },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

  return {
    props: {
      events: filteredEvents,
    },
  };
};
