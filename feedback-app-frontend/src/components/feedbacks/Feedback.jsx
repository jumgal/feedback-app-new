import { Link } from "react-router-dom";

export const Feedback = ({ feedback, isHeaderLink }) => {
  return (
    <div
      className="row p-3 bg-color-light-second d-flex justify-content-between align-items-center"
    >
      <div className="col-2 d-flex flex-column" role="button">
        <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 6l4-4 4 4"
            stroke="#4661E6"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
        <span className="my-2"> {feedback.upvotes}</span>
      </div>
      <div className="col">
        {isHeaderLink ? (
          <Link
            className="text-decoration-none text-black"
            to={`/feedbacks/${feedback._id}`}
            state={{ feedback }}
          >
            <h4>{feedback.title}</h4>
          </Link>
        ) : (
          <h4>{feedback.title}</h4>
        )}
        <p className="mb-0">{feedback.description}</p>
        <button className="btn btn-color-light-first text-color-blue fw-bold mt-2 p-2 category-button">
          {feedback.category}
        </button>
      </div>
      <div className="col-2">
        <svg width="25" height="20" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z"
            fill="#CDD2EE"
            fillRule="nonzero"
          />
        </svg>
        <span className="mx-2">
          {feedback?.comments ? feedback?.comments.length : null}
        </span>
      </div>
    </div>
  );
};
