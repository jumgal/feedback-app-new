import { useEffect } from "react";
import RoadMapCard from "./RoadMapCard";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeedbacks } from "../../store";
import Spinner from "../Spinner";
import ErrorComponent from "../ErrorComponent";

const RoadmapSummary = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

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

  const isButtonDisaled =
    plannedFeedbacks.length === 0 &&
    inProgressFeedbacks.length === 0 &&
    liveFeedbacks.length === 0;

  return (
    <section
      id="roadmap-summary"
      className="rounded w-100 bg-color-light-second my-4 p-3"
    >
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col" className="text-color-blue fw-bold">
              RoadMap
            </th>
            <th className="fw-bold" role="button" scope="col">
              <Link to="/roadmap">
                <button
                  disabled={isButtonDisaled}
                  className="btn btn-white text-color-blue text-decoration-underline"
                >
                  View
                </button>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="fw-bold text-color-orange">&#x2022;</span>
              <span className="text-muted ms-2">Planned</span>
            </td>
            <td className="text-center">{plannedFeedbacks?.length}</td>
          </tr>
          <tr>
            <td>
              <span className="fw-bold text-color-purple">&#x2022;</span>
              <span className="text-muted ms-1 ms-md-2">In-Progress</span>
            </td>
            <td className="text-center">{inProgressFeedbacks?.length}</td>
          </tr>
          <tr>
            <td>
              <span className="fw-bold text-color-blue-light">&#x2022;</span>
              <span className="text-muted ms-2">Live</span>
            </td>
            <td className="text-center">{liveFeedbacks?.length}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default RoadmapSummary;
