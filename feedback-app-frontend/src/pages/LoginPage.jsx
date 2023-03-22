import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import GoBackButton from "../components/buttons/GoBackButton";
import ErrorComponent from "../components/ErrorComponent";
import Spinner from "../components/Spinner";
import { clearError } from "../store";
import { loginUser } from "../store/thunks/auth/loginUser";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const { data: user, isLoading, errors } = useSelector((state) => state.auth);
  useEffect(() => {
    // Redirect when logged in
    if (!errors && !isLoading && Object.keys(user).length !== 0) {
      navigate("/feedbacks");
    }
  }, [errors, user, isLoading, navigate, dispatch]);
  // On componentDidMount set the timer
  useEffect(() => {
    if (errors) {
      const timeId = setTimeout(() => {
        // After 2 seconds set the show value to false
        dispatch(clearError());
      }, 2000);
      return () => {
        clearTimeout(timeId);
      };
    }
  }, [errors, dispatch]);
  const { email, password, password2 } = loginData;
  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
  };

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (errors) {
    content = (
      <ErrorComponent message={errors?.message || "Something went wrong"} />
    );
  } else {
    content = (
      <div className="login-page__content row d-flex justify-content-center align-items-center">
        <div className="col d-flex flex-column align-items-center">
          <h1 className="mb-3 text-color-dark">Login Page</h1>
          <h5 className="d-none d-md-block mb-5 text-color-dark-second">
            Please login to create, change, or view Feedbacks
          </h5>
          <form onSubmit={handleLoginFormSubmit} className="w-75">
            <div className="mb-3">
              <label
                htmlFor="login-email"
                className="form-label text-color-dark"
              >
                Email address
              </label>
              <input
                onChange={handleInputChange}
                value={email}
                name="email"
                type="email"
                className="form-control"
                id="login-email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="login-password"
                className="form-label text-color-dark"
              >
                Password
              </label>
              <input
                value={password}
                onChange={handleInputChange}
                name="password"
                type="password"
                className="form-control"
                id="login-password"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="login-password2"
                className="form-label text-color-dark"
              >
                Retype Password
              </label>
              <input
                value={password2}
                onChange={handleInputChange}
                name="password2"
                type="password"
                className="form-control"
                id="login-password2"
              />
            </div>
            <button
              type="submit"
              className="btn btn-color-dark-second py-3 px-5 fw-bold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <section id="login-page">
      <div className="row mt-2">
        <div className="col-sm-12 col-md-8 bg-color-light-second m-auto">
          <div className="m-3">
            <Link to="/">
              <GoBackButton />
            </Link>
          </div>
          {content}
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
