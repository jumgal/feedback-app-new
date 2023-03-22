import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbacks } from "../../store";
import ErrorComponent from "../ErrorComponent";
import Spinner from "../Spinner";
import ZeroFeedback from "./ZeroFeedback";
import { Feedback } from "./Feedback";

const FeedbackList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  const { isLoading, errors } = useSelector((state) => state.feedbacks);
  const sortOption = useSelector((state) => state.sortOption.option);
  const getFeedbacksByOption = (sortOption, data) => {
    switch (sortOption) {
      case "most-votes":
        return [...data].sort((a, b) => b.upvotes - a.upvotes);
      case "least-votes":
        return [...data].sort((a, b) => a.upvotes - b.upvotes);
      case "most-comments":
        return [...data].sort(
          (a, b) => b?.comments?.length - a?.comments?.length
        );
      case "least-comments":
        return [...data].sort(
          (a, b) => a?.comments?.length - b?.comments?.length
        );
      default:
        return data;
    }
  };
  const feedbacks = useSelector(({ feedbacks: { data } }) => {
    const sugesstionFeedbacks = data?.filter(feed => feed.status === 'suggestion')
    return getFeedbacksByOption(sortOption, sugesstionFeedbacks);
  });

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (errors) {
    content = <ErrorComponent message={errors.message} />;
  } else if (feedbacks.length === 0) {
    content = <ZeroFeedback />;
  } else {
    content = feedbacks?.map((feedback) => (
     <Feedback key={feedback._id} feedback={feedback} isHeaderLink={true}/>
    ));
  }

  return (
    <section id="product-request-list" className="mt-3">
      {content}
    </section>
  );
};

export default FeedbackList;
