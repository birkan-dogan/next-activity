import classes from "./comment-list.module.css";

const CommentList = ({ items }) => {
  const { comments, loading } = items;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul className={classes.comments}>
      {comments?.map((item) => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
