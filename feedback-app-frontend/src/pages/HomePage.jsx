import { Link } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";

const HomePage = () => {
  return (
    <>
      <section
        id="home-page"
        className="row bg-color-light-second w-75 m-auto rounded"
      >
        <div className="col">
          <div className="d-flex flex-column align-items-center justify-content-center home-details">
            <h1 className="my-4 text-color-dark">Do you have a feedback?</h1>
            <p className="fs-3 d-none d-md-block my-4 text-color-dark-second">
              Please choose from an option below
            </p>
            <p className="fs-4 d-md-none my-4 text-color-dark-second">
              Choose an Option
            </p>
            <Link
              to="/new-feedback"
              className="w-100 text-decoration-none d-flex justify-content-center"
            >
              <button className="btn btn-color-gray text-white d-block w-50 mb-2 p-2">
                Create New Feedback
              </button>
            </Link>
            <Link
              to="/feedbacks"
              className="w-100 text-decoration-none d-flex justify-content-center"
            >
              <button className="btn btn-color-gray text-white d-block w-50 mb-2 p-2">
                View All Feedbacks
              </button>
            </Link>
            <Link
              to="/users"
              className="w-100 text-decoration-none d-flex justify-content-center"
            >
              <button className="btn btn-color-gray text-white d-block w-50 p-2 mb-2 ">
                View All Users
              </button>
            </Link>
            <Link
              to="/roadmap"
              className="w-100 text-decoration-none d-flex justify-content-center"
            >
              <button className="btn btn-color-gray text-white d-block w-50 p-2">
                View Roadmaps
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
