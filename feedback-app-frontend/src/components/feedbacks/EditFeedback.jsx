import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import GoBackButton from "../buttons/GoBackButton";
import { Link, useNavigate } from "react-router-dom";
import { deleteFeedback, updateFeedback } from "../../store";
import Spinner from "../Spinner";
import ErrorComponent from "../ErrorComponent";

const EditFeedback = ({ feedbackData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: feedbackData?._id || "",
    title: feedbackData?.title || "",
    category: feedbackData?.category || "",
    status: feedbackData?.status || "suggestion",
    description: feedbackData?.description || "",
  });

  const [editFeedbackLoading, setEditFeedbackLoading] = useState(false);
  const [deleteFeedbackLoading, setDeleteFeedbackLoading] = useState(false);
  const [editFeedbackError, setEditFeedbackError] = useState(null);
  const [deleteFeedbackError, setDeleteFeedbackError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState(null);
  const { id, category, description, title, status } = formData || {};
  useEffect(() => {
    if (successMessage && !editFeedbackLoading && !editFeedbackError) {
      const timerId = setTimeout(() => {
        setSuccessMessage(null);
        navigate(`/feedbacks/${id}`);
      }, 3000);
      return () => clearTimeout(timerId);
    }
  }, [editFeedbackLoading, editFeedbackError, navigate, id, successMessage]);

  useEffect(() => {
    if (
      deleteSuccessMessage &&
      !deleteFeedbackLoading &&
      !deleteFeedbackError
    ) {
      const timerId = setTimeout(() => {
        setDeleteSuccessMessage(null);
        navigate(`/feedbacks`);
      }, 3000);
      return () => clearTimeout(timerId);
    }
  }, [
    deleteFeedbackLoading,
    deleteFeedbackError,
    navigate,
    deleteSuccessMessage,
  ]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateFormSubmit = (e) => {
    e.preventDefault();
    setEditFeedbackLoading(true);
    dispatch(updateFeedback(formData))
      .unwrap()
      .then((res) => {
        if (res) {
          setSuccessMessage(
            "Great. Your update has been successul. You're being redirected to Feedback page."
          );
        }
      })
      .catch((err) => setEditFeedbackError(err))
      .finally(() => {
        setEditFeedbackLoading(false);
      });
  };

  const handleDeleteFeedback = (feedbackId) => {
    dispatch(deleteFeedback(feedbackId))
      .unwrap()
      .then((res) => {
        console.log("bbbb res ", res);
        const { deleted } = res || {};
        if (deleted) {
          setDeleteSuccessMessage("You've successfully deleted feedback");
        }
      })
      .catch((err) => setDeleteFeedbackError(err))
      .finally(() => {
        setDeleteFeedbackLoading(false);
      });
  };
  const options = [
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "ui",
      label: "UI",
    },
    {
      value: "ux",
      label: "UX",
    },
    {
      value: "enhancement",
      label: "Enhancement",
    },
    {
      value: "bug",
      label: "Bug",
    },
  ];

  const statusOptions = [
    {
      value: "planned",
      label: "Planned",
    },
    {
      value: "suggestion",
      label: "Suggestion",
    },
    {
      value: "in-progress",
      label: "In-Progress",
    },
    {
      value: "live",
      label: "Live",
    },
  ];

  if (editFeedbackLoading || deleteFeedbackLoading) {
    return <Spinner />;
  } else if (editFeedbackError || deleteFeedbackError) {
    return (
      <ErrorComponent
        message={
          editFeedbackError?.message || deleteFeedbackError?.message || ""
        }
      />
    );
  }

  return (
    <section id="feedback-edit">
      <div className="row d-flex justify-content-center mt-5 pb-5">
        <div className="col-xs-12 col-md-7 bg-color-light-second rounded">
          <Link to={`/feedbacks/${id}`}>
            <GoBackButton
              name="Go Back to Feedback"
              color="btn-color-purple"
              textColor="color-white"
            />
          </Link>
        </div>
      </div>
      {successMessage && (
        <div className="row d-flex justify-content-center mt-5 pb-5">
          <div className="col-xs-12 col-md-7 bg-success rounded">
            <p className="fw-bold text-white m-2 p-2">{successMessage}</p>
          </div>
        </div>
      )}
      {deleteSuccessMessage && (
        <div className="row d-flex justify-content-center mt-5 pb-5">
          <div className="col-xs-12 col-md-7 bg-success rounded">
            <p className="fw-bold text-white m-2 p-2">{deleteSuccessMessage}</p>
          </div>
        </div>
      )}
      <div className="row d-flex justify-content-center my-5">
        <div className="col-xs-12 col-md-7 bg-color-light-second rounded">
          <img
            style={{ width: "70px", marginTop: "-2rem" }}
            src="../../assets/shared/icon-edit-feedback.svg"
            alt="edit-feedback-svg"
            className="edit-feedback-svg"
          />
          <h3 className="mt-4 p-3 text-color-dark-second fw-bold">{`Editing '${title}'`}</h3>
          <form onSubmit={handleUpdateFormSubmit}>
            <div className="mb-3 mt-5 p-3">
              <label
                htmlFor="feedback-title"
                className="form-label mb-0 fw-bold text-color-dark-second"
              >
                Feedback Title
              </label>
              <div
                id="feedback-title-help"
                className="form-text text-color-dark-second mb-3"
              >
                Add a short, descriptive headline
              </div>
              <input
                value={title}
                onChange={handleInputChange}
                name="title"
                type="text"
                className="form-control border-0 text-color-dark bg-color-light-first px-2 py-3"
                id="feedback-title"
                aria-describedby="feedback-title-help"
              />
            </div>
            <div className="mb-3 p-3">
              <label
                htmlFor="feedback-select"
                className="form-label mb-0 fw-bold text-color-dark-second"
              >
                Category
              </label>
              <div
                id="feedback-select-help"
                className="form-text text-color-dark-second mb-3"
              >
                Choose a category for your feedback
              </div>
              <select
                className="form-select bg-color-light-first py-2 text-color-dark"
                aria-label="feedback options"
                value={category}
                onChange={handleInputChange}
                name="category"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 p-3">
              <label
                htmlFor="feedback-select"
                className="form-label mb-0 fw-bold text-color-dark-second"
              >
                Update status
              </label>
              <div
                id="feedback-select-help"
                className="form-text text-color-dark-second mb-3"
              >
                Change feedback state
              </div>
              <select
                className="form-select bg-color-light-first py-2 text-color-dark"
                aria-label="feedback options"
                value={status}
                onChange={handleInputChange}
                name="status"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 p-3">
              <label
                htmlFor="feedback-detail"
                className="form-label mb-0 fw-bold text-color-dark-second"
              >
                Feedback Detail
              </label>
              <div
                id="feedback-detail-help"
                className="form-text text-color-dark-second mb-3"
              >
                Include any specific comments on what should be added, improved,
                etc.
              </div>
              <input
                onChange={handleInputChange}
                name="description"
                value={description}
                type="text-area"
                className="form-control input-feedback__detail border-0 bg-color-light-first text-color-dark px-4"
                id="feedback-detail"
                aria-describedby="feedback-detail-help"
              />
            </div>
            <div className="d-flex flex-column flex-md-row justify-content-md-between p-3 my-3">
              <button
                onClick={() => handleDeleteFeedback(feedbackData._id)}
                type="button"
                className="btn btn-danger text-white mb-2 px-5 py-2"
              >
                Delete
              </button>
              <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center">
                <Link to={`/feedbacks/${id}`}>
                  <button
                    type="button"
                    className="btn btn-color-dark text-white mb-2 px-5 py-2 w-100"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  className="btn btn-color-purple text-white mb-2 px-5 py-2 ms-md-2"
                >
                  Update Feedback
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditFeedback;
