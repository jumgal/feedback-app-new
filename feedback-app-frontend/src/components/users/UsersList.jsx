import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { fetchUsers } from "../../store";
import ErrorComponent from "../ErrorComponent";
import Spinner from "../Spinner";

const UsersList = () => {
  const dispatch = useDispatch();
  const { data: auth } = useSelector((state) => state.auth);
  const { isLoading, data, errors } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const renderUsers = data
    ?.filter((user) => user._id !== auth._id)
    .map((user) => {
      return (
        <div className="col">
          <div className="card d-flex flex-column align-items-center p-3">
            <img
              style={{ width: "40%" }}
              src={`../..${user?.image}`}
              className="card-img-top rounded-circle img-fluid"
              alt={user?.name}
            />
            <div className="card-body">
              <h6 className="fw-bold text-color-blue mb-0">{user?.name}</h6>
              <p>@{user?.username}</p>
            </div>
            {/* {auth?.admin && (
              <button className="btn btn-danger">
                <RiDeleteBin6Fill /> <span className="pe-2">delete user</span>
              </button>
            )} */}
          </div>
        </div>
      );
    });
  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (errors) {
    content = <ErrorComponent message={errors.message} />;
  } else {
    content = (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">{renderUsers}</div>
    );
  }
  return content;
};

export default UsersList;
