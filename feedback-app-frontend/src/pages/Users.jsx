import GoBackButton from "../components/buttons/GoBackButton";
import UsersList from "../components/users/UsersList";
import { Link } from "react-router-dom";

const Users = () => {
  return (
    <section
      id="users-list"
      className="row my-5 d-md-flex justify-content-md-center"
    >
      <div className="col col-md-8">
        <div className="d-flex flex-column flex-lg-row justify-content-lg-between">
          <Link to="/" className="mb-2">
            <GoBackButton name="Go back to Homepage" color="btn-color-blue-light"/>
          </Link>
          <Link to="/feedbacks">
            <GoBackButton name="Go back to Feedbacks" color="btn-color-blue-light"/>
          </Link>
        </div>
        <h2 className="text-center color-blue p-3">List of Users</h2>
        <UsersList />
      </div>
    </section>
  );
};

export default Users;
