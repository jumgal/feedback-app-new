import { useReducer, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addFeedback } from "../../reducers/feedbackReducers";
import { ADD_FEEDBACK, TEXT_VALUE_CHANGE, CLEAR_TEXT_VALUE } from "../../types";
import GoBackButton from "../buttons/GoBackButton";
import { createFeedback, clearFeedbackError } from "../../store";
import Spinner from "../Spinner";

const NewFeedback = () => {
  const dispatchRTK = useDispatch();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(addFeedback, {
    title: "",
    feedbackCategory: "feature",
    description: "",
  });
  const [isCreateFeedbackLoading, setIsCreateFeedbackLoading] = useState(false);
  const [createFeedbackSuccess, setCreateFeedbackSucces] = useState(null);
  const [createFeedbackError, setCreateFeedbackError] = useState(null);
  const { title, feedbackCategory, description } = state;

  useEffect(() => {
    if (
      createFeedbackSuccess &&
      !isCreateFeedbackLoading &&
      !createFeedbackError
    ) {
      const timerId = setTimeout(() => {
        setCreateFeedbackSucces(null);
        navigate("/feedbacks");
      }, 3000);
      return () => clearTimeout(timerId);
    }
  }, [
    createFeedbackSuccess,
    isCreateFeedbackLoading,
    createFeedbackError,
    navigate,
  ]);

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

  const handleInputValueChange = (e) => {
    dispatch({
      type: TEXT_VALUE_CHANGE,
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setIsCreateFeedbackLoading(true);
    const newFeedback = {
      title,
      category: feedbackCategory,
      description,
    };
    dispatchRTK(createFeedback(newFeedback))
      .unwrap()
      .then((res) => {
        if (Object.keys(res).length > 0) {
          setCreateFeedbackSucces(
            "Thank you for your Feedback. We'll notify you for next steps!"
          );
        }
      })
      .catch((err) => setCreateFeedbackError(err))
      .finally(() => setIsCreateFeedbackLoading(false));
    // dispatch({
    //   type: CLEAR_TEXT_VALUE,
    //   payload: {
    //     name: "",
    //     value: "",
    //   },
    // });
  };

  if (isCreateFeedbackLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="row w-50 m-auto mb-4">
        <div className="col">
          <Link to="/feedbacks">
            <GoBackButton />
          </Link>
        </div>
      </div>
      <div className="row bg-color-light-second m-auto feedback-row">
        <div className="col feedback-column rounded p-4">
          {createFeedbackSuccess && (
            <div className="alert alert-success" role="alert">
              {createFeedbackSuccess}
            </div>
          )}
          {createFeedbackError && (
            <div className="alert alert-danger" role="alert">
              {createFeedbackError?.message ||
                "Error while creating new feedback"}
            </div>
          )}

          <svg width="56" height="56" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient
                cx="103.9%"
                cy="-10.387%"
                fx="103.9%"
                fy="-10.387%"
                r="166.816%"
                id="a"
              >
                <stop stopColor="#E84D70" offset="0%" />
                <stop stopColor="#A337F6" offset="53.089%" />
                <stop stopColor="#28A7ED" offset="100%" />
              </radialGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <circle fill="url(#a)" cx="28" cy="28" r="28" />
              <path
                fill="#FFF"
                fillRule="nonzero"
                d="M30.343 36v-5.834h5.686v-4.302h-5.686V20h-4.597v5.864H20v4.302h5.746V36z"
              />
            </g>
          </svg>
          <h3 className="mt-4 mb-3">Create New Feedback</h3>
          <form onSubmit={handleFeedbackSubmit}>
            <div className="mb-3">
              <label
                htmlFor="feedback-title"
                className="form-label mb-0 fw-bold text-color-dark-second"
              >
                Feedback Title
              </label>
              <div id="feedback-title-help" className="form-text mb-3">
                Add a short, descriptive headline
              </div>
              <input
                onChange={handleInputValueChange}
                value={title}
                name="title"
                type="text"
                className="form-control input-feedback__headline border-0 bg-color-light-first"
                id="feedback-title"
                aria-describedby="feedback-title-help"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="feedback-select"
                className="form-label mb-0 fw-bold text-color-dark-second"
              >
                Category
              </label>
              <div id="feedback-select-help" className="form-text mb-3">
                Choose a category for your feedback
              </div>
              <select
                className="form-select bg-color-light-first"
                aria-label="feedback options"
                value={feedbackCategory}
                onChange={handleInputValueChange}
                name="feedbackCategory"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label
                htmlFor="feedback-detail"
                className="form-label mb-0 fw-bold text-color-dark-second"
              >
                Feedback Detail
              </label>
              <div id="feedback-detail-help" className="form-text mb-3">
                Include any specific comments on what should be added, improved,
                etc.
              </div>
              <input
                onChange={handleInputValueChange}
                name="description"
                value={description}
                type="text-area"
                className="form-control input-feedback__detail border-0 bg-color-light-first"
                id="feedback-detail"
                aria-describedby="feedback-detail-help"
              />
            </div>
            <div className="d-flex justify-content-end">
              <Link to="/">
                <button
                  type="button"
                  className="btn btn-color-dark-second text-white mx-2"
                >
                  Cancel
                </button>
              </Link>
              <button type="submit" className="btn btn-color-purple text-white">
                Add Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewFeedback;
