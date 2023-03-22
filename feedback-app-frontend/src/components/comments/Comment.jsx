import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Reply from "../replies/Reply";

const Comment = ({ feedback, user }) => {
  const { data: users } = useSelector((state) => state.users);
  const findCommentCreator = (user) => {
    return users?.find((u) => u._id === user);
  };
  let commentCount = feedback?.comments?.length || 0;

  const renderComments = feedback?.comments?.map((comment) => {
    const { name, username, image } = findCommentCreator(comment.user) || {};
    let replyCount = comment?.replies?.length || 0;
    commentCount += replyCount;
    return (
      <Fragment key={comment._id}>
        <div className="row p-3 bg-color-light-second mt-4 rounded text-color-dark">
          <div className="comment-user-photo col-2">
            <img
              src={`../..${image}`}
              alt={user?.name}
              className="rounded-circle img-fluid"
            />
          </div>
          <div className="comment-content col-10">
            <div className="comment-content-top d-flex justify-content-between mb-4">
              <div className="d-flex flex-column">
                <h6 className="mb-0 fw-bold">{name}</h6>
                <p>@{username}</p>
              </div>
              <Link
                to={`/reply/${comment._id}`}
                state={{ feedbackId: feedback._id }}
              >
                <button className="btn btn-color-light text-color-blue fw-bold">
                  Reply
                </button>
              </Link>
            </div>
            <div className="comment-content-bottom pb-3">
              {comment?.content}
            </div>
          </div>
        </div>
        {comment?.replies?.length > 0 && <Reply comment={comment} />}
      </Fragment>
    );
  });
  return (
    <>
      {commentCount > 0 && <h4 className="p-3 m-2">{commentCount} Comments</h4>}
      {feedback?.comments?.length > 0 && renderComments}
    </>
  );
};

export default Comment;
