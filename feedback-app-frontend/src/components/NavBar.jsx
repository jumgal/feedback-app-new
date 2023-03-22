import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavbarLeftLogo from "./NavbarLeftLogo";
import NavbarOptions from "./NavbarOptions";

const NavBar = () => {
  const feedbacks =
    useSelector((state) =>
      state.feedbacks?.data?.filter(
        (feedback) => feedback.status === "suggestion"
      )
    ) || [];

  
  return (
    <nav className="navbar row d-flex justify-content-between align-items-center bg-color-dark rounded p-3">
      <div className="col-6 col-md-9">
        <div className="row d-flex align-items-center justify-content-md-start">
          <div className="col-md-6 col-0">
            <div className="row d-none d-md-flex flex-row justify-content-start align-items-center">
              <div className="col-2">
                <NavbarLeftLogo />
              </div>
              <div className="col-md-6 col-12">
                <p className="text-white mb-0">
                  <span>{feedbacks?.length}</span> Suggestions
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <NavbarOptions />
          </div>
        </div>
      </div>
      <div className="col-md-3 col-6 text-end">
        <Link to="/new-feedback">
          <button className="btn btn-color-purple overflow-auto">
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

export default NavBar;
