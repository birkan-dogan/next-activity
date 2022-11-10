import { useState, useEffect } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

import { useContext } from "react";
import NotificationContext from "../../store/notification-context";

const Comments = (props) => {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState({ comments: [], loading: true });

  // consuming notification-context
  const notificationCtx = useContext(NotificationContext);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) =>
          setComments({ ...comments, comments: data.comments, loading: false })
        );
    }
  }, [showComments]);

  const addCommentHandler = (commentData) => {
    // send data to API

    notificationCtx.showNotification({
      title: "Comment",
      message: "Creating new comment",
      status: "pending",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }
        return response.json();
      })
      .then((data) =>
        notificationCtx.showNotification({
          title: "New Comment",
          message: "Comment was added successfully",
          status: "success",
        })
      )
      .catch((error) =>
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong",
          status: "error",
        })
      );
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
};

export default Comments;
