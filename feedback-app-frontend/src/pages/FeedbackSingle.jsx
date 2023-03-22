import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoBackButton from "../components/buttons/GoBackButton";
import FeedbackComments from "../components/feedbacks/FeedbackComments";
import { fetchFeedbackWithComments } from "../store";
import { Feedback } from "../components/feedbacks/Feedback";
import Spinner from "../components/Spinner";
import ErrorComponent from "../components/ErrorComponent";
import NewComment from "../components/comments/NewComment";

export const FeedbackSingle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { feedbackId } = params || {};
  const {
    isLoading: commentLoading,
    data: comment,
    errors: commentErrors,
  } = useSelector((state) => state.comment);
  useEffect(() => {
    dispatch(fetchFeedbackWithComments(feedbackId));
  }, [dispatch, feedbackId, comment?.content]);
  const { isLoading, data, errors } = useSelector((state) => state.feedback);

  useEffect(() => {
    if (Object.keys(data) === 0) {
      navigate("/feedbacks");
    }
  }, [data, navigate]);
  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (errors) {
    content = <ErrorComponent />;
  } else {
    content = (
      <div className="feedback-single__content p-3">
        <div className="single-feedback--top">
          <Feedback feedback={data} isHeaderLink={false} />
        </div>
        <div className="single-feedback--middle d-flex flex-column">
          <FeedbackComments feedback={data} />
        </div>
        <div className="single-feedback--bottom row p-3 bg-color-light-second rounded">
          <NewComment feedbackId={feedbackId} />
        </div>
      </div>
    );
  }

  return (
    <section id="single-feedback" className="w-75 mx-auto ">
      <div className="feedback-single__buttons p-3 d-flex justify-content-between">
        <Link to="/feedbacks">
          <GoBackButton />
        </Link>
        <Link to={`/feedback/${feedbackId}`} state={{ feedbackData: data }}>
          {" "}
          <button className="btn btn-color-blue px-5 py-3">Edit</button>
        </Link>
      </div>
      {content}
    </section>
  );
};
