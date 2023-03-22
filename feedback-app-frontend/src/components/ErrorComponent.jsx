const ErrorComponent = ({ message = "" }) => {
  return (
    <div
      className="alert custom-error alert-danger d-flex align-items-center"
      role="alert"
    >
      <svg
        className="bi flex-shrink-0 me-2"
        width="24"
        height="24"
        role="img"
        aria-label="Danger:"
      ></svg>
      <div>{message ? message : "something went wrong"}</div>
    </div>
  );
};

export default ErrorComponent;
