import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import GoBackButton from "../components/buttons/GoBackButton";
import { createUser, clearError } from "../store";
// import { useThunk } from "../store/hooks/use-thunk";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user, isLoading, errors } = useSelector((state) => state.auth);

  // const [doCreateUser, isCreatingUser, creatingUserError] =
  //   useThunk(createUser);
  const [registerData, setRegisterData] = useState({
    registerName: "",
    registerUsername: "",
    // registerImage: "",
    registerEmail: "",
    registerPassword: "",
  });

  const {
    registerName,
    registerUsername,
    // registerImage,
    registerEmail,
    registerPassword,
  } = registerData;

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

  const handleRegisterInputChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterFormSubmit = (e) => {
    e.preventDefault();

    dispatch(createUser(registerData));
    setRegisterData({
      registerName: "",
      registerUsername: "",
      // registerImage: "",
      registerEmail: "",
      registerPassword: "",
    });
  };

  let content;

  if (isLoading) {
    content = (
      <div className="register-page__content row d-flex justify-content-center align-items-start">
        <div className="d-flex align-items-center">
          <strong>Loading...</strong>
          <div
            className="spinner-border ms-auto"
            role="status"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    );
  } else if (errors) {
    content = (
      <div className="register-page__content row d-flex justify-content-center align-items-start">
        <div className="alert alert-danger w-75" role="alert">
          {errors?.message && errors.message}
        </div>
      </div>
    );
  } else {
    content = (
      <div className="register-page__content row d-flex justify-content-center align-items-center">
        <div className="col d-flex flex-column align-items-center">
          <h1 className="mb-5 text-color-dark">Register Page</h1>
          <form onSubmit={handleRegisterFormSubmit} className="w-75">
            <div className="mb-3">
              <label
                htmlFor="register-name"
                className="form-label text-color-dark"
              >
                Name
              </label>
              <input
                onChange={handleRegisterInputChange}
                name="registerName"
                value={registerName}
                type="text"
                className="form-control"
                id="register-name"
                aria-describedby="register-name"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="register-username"
                className="form-label text-color-dark"
              >
                Username
              </label>
              <input
                onChange={handleRegisterInputChange}
                value={registerUsername}
                name="registerUsername"
                type="text"
                className="form-control"
                id="register-username"
                aria-describedby="register-username"
              />
            </div>
            {/* <div className="mb-3">
              <label
                htmlFor="register-image"
                className="form-label text-color-dark"
              >
                Image
              </label>
              <input
                onChange={handleRegisterInputChange}
                value={registerImage}
                name="registerImage"
                type="text"
                className="form-control"
                id="register-image"
                aria-describedby="register-image"
              />
            </div> */}
            <div className="mb-3">
              <label
                htmlFor="register-email"
                className="form-label text-color-dark"
              >
                Email address
              </label>
              <input
                onChange={handleRegisterInputChange}
                value={registerEmail}
                name="registerEmail"
                type="email"
                className="form-control"
                id="register-email"
                aria-describedby="register-email"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="register-password"
                className="form-label text-color-dark"
              >
                Password
              </label>
              <input
                onChange={handleRegisterInputChange}
                name="registerPassword"
                value={registerPassword}
                type="password"
                className="form-control"
                id="register-password"
              />
            </div>
            <button
              type="submit"
              className="btn btn-color-dark-second py-3 px-5 fw-bold"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <section id="register-page">
      <div className="row mt-2">
        <div className="col-12 col-md-8 bg-color-light-second m-auto">
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

export default RegisterPage;
