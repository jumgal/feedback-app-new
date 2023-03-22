import { Link } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaSign } from "react-icons/fa";
import { useAuthStatus } from "../store/hooks/useAuthStatus";
import { logout } from "../store";
import { useDispatch } from "react-redux";

const HomeNavbar = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useAuthStatus();
  const handleLogoutUser = () => {
    dispatch(logout());
  };

  let navContent;
  if (loggedIn) {
    navContent = (
      <ul className="navbar-nav ms-auto">
        <Link>
          <li className="nav-item m-2">
            <button
              onClick={handleLogoutUser}
              className="btn btn-color-dark-second text-white p-2"
              type="button"
            >
              <FaSignOutAlt /> <span className="m-2">Log out</span>
            </button>
          </li>
        </Link>
      </ul>
    );
  } else {
    navContent = (
      <ul className="navbar-nav ms-auto">
        <Link to="/login">
          <li className="nav-item m-2">
            <button
              className="btn btn-color-dark-second text-white p-2"
              type="button"
            >
              <FaSignInAlt /> <span className="m-2">Login</span>
            </button>
          </li>
        </Link>
        <Link to="/register">
          <li className="nav-item m-2">
            <button
              className="btn btn-color-dark-second text-white p-2"
              type="button"
            >
              <FaSign /> <span className="m-2">Register</span>
            </button>
          </li>
        </Link>
      </ul>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-navbar-light-second">
      <div className="container-fluid">
        <Link className="navbar-brand m-2" to="/">
          <h3>Feedback Tracker</h3>
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          {navContent}
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
