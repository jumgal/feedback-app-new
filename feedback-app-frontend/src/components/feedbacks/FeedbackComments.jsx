import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../../store";
import Comment from '../comments/Comment'

const FeedbackComments = ({ feedback }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, feedback?.user]);
  const {
    isLoading,
    data: users,
    errors,
  } = useSelector((state) => state.users);

  const user = users?.find((u) => u._id === feedback.user);

  return <Comment feedback={feedback} user={user} />;
};

export default FeedbackComments;
