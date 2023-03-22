import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createReply } from "../store";
import GoBackButton from "../components/buttons/GoBackButton";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ErrorComponent from "../components/ErrorComponent";

const ReplyPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const {
    state: { feedbackId },
  } = useLocation();
  const [replyContent, setReplyContent] = useState("");
  const [message, setMessage] = useState({
    successMessage: "",
    errorMessage: "",
  });
  const { commentId } = params;
  const { isLoading, data, errors } = useSelector((state) => state.reply);
  const { successMessage, errorMessage } = message;

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timerId = setTimeout(() => {
        setMessage({
          successMessage: "",
          errorMessage: "",
        });
      }, 2000);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [successMessage, errorMessage]);

  const handleReplyFormSubmit = (e) => {
    e.preventDefault();
    if (!replyContent) {
      setMessage({
        ...message,
        errorMessage: "Please provide content!",
      });
      return;
    }

    dispatch(
      createReply({
        content: replyContent,
        commentId,
      })
    )
      .unwrap()
      .then((res) => {
        if (res) {
          setMessage({
            ...message,
            successMessage: "Thanks for your comment. We're strong together!",
          });
          setTimeout(() => {
            navigate(`/feedbacks/${feedbackId}`);
          }, 2000);
        }
      })
      .catch((err) =>
        setMessage({
          ...message,
          errorMessage: err?.message || "something went wrong!",
        })
      );
  };
  if (isLoading) {
    return <Spinner />;
  } else if (errors) {
    return <ErrorComponent message={errors.message} />;
  }
  return (
    <section id="reply-page" className="row d-flex justify-content-center p-3">
      <Link to="/feedbacks">
        <GoBackButton />
      </Link>
      {message?.successMessage && (
        <div className="alert alert-success m-2 p-2 w-50" role="alert">
          <h4 className="alert-heading">Well done!</h4>
          <p>
            It is awesome, you successfully submitted your reply to a comment.
            We're stronger together!
          </p>
        </div>
      )}
      <form onSubmit={handleReplyFormSubmit} className="col-xs-12 col-md-8">
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlTextarea1"
            className="form-label fw-bold mb-3"
          >
            Reply to Comment
          </label>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="form-control p-3"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Content"
          ></textarea>
        </div>
        {message?.errorMessage && (
          <div id="emailHelp" className="form-text text-danger pb-2">
            {message?.errorMessage}
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </section>
  );
};

export default ReplyPage;
