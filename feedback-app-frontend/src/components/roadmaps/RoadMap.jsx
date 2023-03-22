import { useEffect } from "react";
import RoadMapCard from "./RoadMapCard";
import RoadMapNavbar from "./RoadMapNavbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeedbacks } from "../../store";
import Spinner from "../Spinner";
import ErrorComponent from "../ErrorComponent";

const RoadMap = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  const renderFeedbackByStatus = (feedbacks, color) => {
    if (feedbacks && feedbacks.length > 0) {
      return feedbacks.map((fBack) => (
        <RoadMapCard key={fBack._id} feedback={fBack} color={color} />
      ));
    }

    return null;
  };

  const { isLoading, data, errors } = useSelector((state) => state.feedbacks);

  const plannedFeedbacks =
    useSelector((state) =>
      state.feedbacks?.data?.filter((feedback) => feedback.status === "planned")
    ) || [];

  const inProgressFeedbacks =
    useSelector((state) =>
      state.feedbacks?.data?.filter(
        (feedback) => feedback.status === "in-progress"
      )
    ) || [];

  const liveFeedbacks =
    useSelector((state) =>
      state.feedbacks?.data?.filter((feedback) => feedback.status === "live")
    ) || [];

  if (isLoading) {
    return <Spinner />;
  }

  if (errors) {
    return <ErrorComponent message={errors?.message || ""} />;
  }

  return (
    <>
      <RoadMapNavbar />
      <div className="row mt-3 mt-md-5 p-2">
        <div className="col-12 col-md">
          <h4 className="text-color-dark-second fw-bold">
            Planned ({plannedFeedbacks.length})
          </h4>
          <p>Ideas prioritized for research</p>
          {renderFeedbackByStatus(plannedFeedbacks, "color-orange")}
        </div>
        <div className="col-12 col-md">
          <h4 className="text-color-dark-second fw-bold">
            In-Progress ({inProgressFeedbacks.length})
          </h4>
          <p>Currently being developed</p>
          {renderFeedbackByStatus(inProgressFeedbacks, "color-purple")}
        </div>
        <div className="col col-12 col-md">
          <h4 className="text-color-dark-second fw-bold">
            Live ({liveFeedbacks.length})
          </h4>
          <p>Released features</p>
          {renderFeedbackByStatus(liveFeedbacks, "color-blue-light")}
        </div>
      </div>
    </>
  );
};

export default RoadMap;
