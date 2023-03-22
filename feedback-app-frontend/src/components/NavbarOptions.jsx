import {useDispatch, useSelector} from 'react-redux'
import { optionChange } from '../store';

const NavbarOptions = () => {
  const dispatch = useDispatch()

  const handleOptionChange = (e) => {
    dispatch(optionChange(e.target.value))
  };

  const sortOption = useSelector(state => state.sortOption.option)

  return (
    <div className="row d-flex justify-content-center align-items-center">
      <div className="col-3 d-flex justify-content-end">
        <p className="text-white fw-light mb-0">Sort By:</p>
      </div>
      <div className="col p-2">
        <select
          className="form-select p-2 bg-color-dark text-white border-1"
          aria-label=".form-select-lg example"
          onChange={handleOptionChange}
        >
          <option value="most-votes" defaultValue={sortOption === "most-votes"}>
            Most Upvotes
          </option>
          <option
            value="least-votes"
            defaultValue={sortOption === "least-votes"}
          >
            Least Upvotes
          </option>
          <option
            value="most-comments"
            defaultValue={sortOption === "most-comments"}
          >
            Most Comments
          </option>
          <option
            value="least-comments"
            defaultValue={sortOption === "least-comments"}
          >
            Least Comments
          </option>
        </select>
      </div>
    </div>
  );
};

export default NavbarOptions;
