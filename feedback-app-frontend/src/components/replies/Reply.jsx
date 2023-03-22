import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentreplies } from "../../store";
import ErrorComponent from "../ErrorComponent";
import Spinner from "../Spinner";

const Reply = ({ comment }) => {
  const dispatch = useDispatch();
  const { data: users } = useSelector((state) => state.users);
  const {
    isLoading: commentReplyLoading,
    data: commentReplies,
    errors: commentReplyErrors,
  } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(fetchCommentreplies(comment?._id));
  }, [comment, dispatch]);

  const findReplier = (userId) => {
    return users.find((u) => u._id === userId);
  };

  const commentOwner = users.find((u) => u._id === commentReplies?.user);

  if (commentReplyLoading) {
    return <Spinner />;
  } else if (commentReplyErrors) {
    return <ErrorComponent message={commentReplyErrors.message} />;
  }

  const renderReplies = commentReplies?.replies?.map((reply) => {
    const replier = findReplier(reply.user) || "";

    return (
      <div
        key={reply._id}
        style={{ width: "90%" }}
        className="row p-3 bg-color-light-second align-self-end mt-4 rounded text-color-dark"
      >
        <div className="comment-user-photo col-2">
          <img
            src={`../..${replier?.image}`}
            alt={replier?.name}
            className="rounded-circle img-fluid"
          />
        </div>
        <div className="comment-content col-10 text-color-dark">
          <div className="comment-content-top d-flex justify-content-between mb-2">
            <div className="d-flex flex-column">
              <h6 className="mb-0 ">{replier?.name}</h6>
              <p className="small text-dark-second">@{replier?.username}</p>
            </div>
          </div>
          <div className="comment-content-bottom small">
            <span>Hey </span>
            <span className="fw-bold text-color-purple pe-1">
              {commentOwner && commentOwner.username + ", "}
            </span>
            {reply?.content}
          </div>
        </div>
      </div>
    );
  });

  return comment?.renderReplies?.length > 0 && renderReplies;
};

export default Reply;
