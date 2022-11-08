import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

import Head from "next/head";

import NewsletterRegistration from "../components/input/newsletter-registration";

export default function Home(props) {
  // const featuredEvents = getFeaturedEvents();
  const { featuredEvents } = props;
  return (
    <div>
      <Head>
        <title>Next Activity</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evlove..."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NewsletterRegistration />
      <EventList items={featuredEvents} />
    </div>
  );
}

// using getStaticProps function makes sense here, we don't need to pre-render it for every request

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800, // every half hour we regenerate this page for a new incoming request
  };
};
