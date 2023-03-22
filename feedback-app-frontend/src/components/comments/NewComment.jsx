import { useState } from "react";
import { useDispatch } from "react-redux"
import { createComment } from "../../store";

const NewComment = ({feedbackId}) => {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");

  const handleCommentFormSubmit = (e) => {
   e.preventDefault()
   dispatch(createComment({
    newComment,
    feedbackId
   }))
  }
  return (
    <form onSubmit={handleCommentFormSubmit}>
      <div className="mb-3">
        <label
          htmlFor="feedback-detail"
          className="form-label mb-2 fw-bold fs-5 text-color-dark-second"
        >
          Add Comment
        </label>
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          name="description"
          type="text-area"
          className="form-control input-feedback__detail border-0 bg-color-light-first p-3"
          id="feedback-detail"
          aria-describedby="feedback-detail-help"
          placeholder="Type your comment here"
          maxLength="250"
        />
      </div>
      <div className="my-3 d-flex justify-content-between align-items-center">
        <span className="text-color-gray">
          {250 - newComment.length + " Characters left"}
        </span>
        <button
          type="submit"
          className="btn btn-color-purple text-color-white px-3 py-2"
        >
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default NewComment;
