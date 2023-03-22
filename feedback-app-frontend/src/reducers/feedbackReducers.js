import { ADD_FEEDBACK, TEXT_VALUE_CHANGE, CLEAR_TEXT_VALUE } from "../types";

const addFeedback = (state, action = {}) => {
  switch (action.type) {
    case ADD_FEEDBACK:
      return {
        ...state,
      };

    case TEXT_VALUE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case CLEAR_TEXT_VALUE:
      return {
        ...state,
        title: '',
        description: ''
      }
    default:
      return state;
  }
};

export { addFeedback };
