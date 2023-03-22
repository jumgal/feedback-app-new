const RoadMapCard = ({ feedback, color="color-orange" }) => {
  return (
    <div
      className={`bg-color-light-second border-top border-4 border-${color} rounded my-4 px-4 py-3`}
    >
      <p>
        <span className={`fw-bold text-${color} fs-2`}>&#x2022;</span>{" "}
        <span className="text-muted ms-2">Planned</span>
      </p>
      <h5 className="text-color-dark-second fw-bold mb-3">
        {feedback?.title || ""}
      </h5>
      <p>{feedback?.description || ""}</p>
      <button className="btn d-block bg-color-light-first rounded text-color-blue fw-bold py-2 px-3 mb-3">
        {feedback?.category || ""}
      </button>
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-color-light-first text-dark rounded fw-bold py-2 px-3">
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 6l4-4 4 4"
              stroke="#4661E6"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
          <span className="my-2 ps-3">{feedback?.upvotes}</span>
        </button>
        <div>
          <svg width="25" height="20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z"
              fill="#CDD2EE"
              fillRule="nonzero"
            />
          </svg>
          <span className="mx-2">2</span>
        </div>
      </div>
    </div>
  );
};

export default RoadMapCard;
