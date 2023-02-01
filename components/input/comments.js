import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState([]);

  // 수정포인트 체크 - 45,46 라인 setIsAdd 참고
  const [isAdded, setIsAdded] = useState(false);
  // 수정포인트 체크 - 45,46 라인 setIsAdd 참고

  useEffect(() => {
    if (!showComments) {
      fetch("/api/comments/" + eventId)
        .then((response) => response.json())
        .then((data) => setCommentList(data.comments));
    }
  }, [showComments]);

  // 수정포인트 체크 - 45,46 라인 setIsAdd 참고
  useEffect(() => {
    if (isAdded) {
      fetch("/api/comments/" + eventId)
        .then((response) => response.json())
        .then((data) => setCommentList(data.comments));
    }
  }, [isAdded]);
  // 수정포인트 체크 - 45,46 라인 setIsAdd 참고

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json(), setIsAdded(false))
      .then((data) => setIsAdded(true));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={commentList} />}
    </section>
  );
}

export default Comments;
