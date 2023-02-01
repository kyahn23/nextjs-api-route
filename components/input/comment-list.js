import classes from "./comment-list.module.css";

function CommentList(props) {
  const { items } = props;
  return (
    <ul className={classes.comments}>
      {items.map((cmnt) => (
        <li key={cmnt._id}>
          <p>{cmnt.comment.text}</p>
          <div>
            By <address>{cmnt.comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
