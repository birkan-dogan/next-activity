import EventItem from "../event-item";

const EventList = (props) => {
  const { items } = props;
  return (
    <ul>
      {items.map((item) => (
        <EventItem event={item} key={item.id} />
      ))}
    </ul>
  );
};
export default EventList;
