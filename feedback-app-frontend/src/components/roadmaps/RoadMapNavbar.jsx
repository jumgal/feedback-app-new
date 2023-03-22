import { Link } from "react-router-dom";
import GoBackButton from "../buttons/GoBackButton";

const RoadMapNavbar = () => {

  return (
    <nav className="navbar row d-flex justify-content-between align-items-center bg-color-dark rounded p-3">
      <div className="col-4 col-md-3">
        <div className="row d-flex flex-column align-items-start justify-content-center ps-3">
          <Link to="/feedbacks">
            <GoBackButton textColor="text-white" color="bg-dark-second" />
          </Link>
          <h4 className="text-white">Roadmap</h4>
        </div>
      </div>
      <div className="col-8 col-md-9 text-end pe-3">
        <Link to="/new-feedback">
          <button className="btn btn-color-purple overflow-auto px-3 py-2">
            <svg width="9" height="9" xmlns="http://www.w3.org/2000/svg">
              <text
                transform="translate(-24 -20)"
                fill="#F2F4FE"
                fillRule="evenodd"
                fontFamily="Jost-Bold, Jost"
                fontSize="14"
                fontWeight="bold"
              >
                <tspan x="24" y="27.5">
                  +
                </tspan>
              </text>
            </svg>{" "}
            Add Feedback
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default RoadMapNavbar;
