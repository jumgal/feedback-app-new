const GoBackButton = ({
  name = "Go Back",
  color = "btn-color-light-second",
  textColor="text-color-dark-second"
}) => {
  return (
    <button className={`btn ${color} ${textColor} px-4 py-3 fw-bold go-back-button`}>
      <svg width="20" height="15" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 9L2 5l4-4"
          stroke="#333"
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
        />
      </svg>
      <span>{name}</span>
    </button>
  );
};

export default GoBackButton;
