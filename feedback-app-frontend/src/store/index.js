import { configureStore } from "@reduxjs/toolkit";
import { authReducer, clearError, logout } from "./slices/auth/authSlice";
import { usersReducer } from "./slices/auth/userSlice";
import { commentReducer } from "./slices/comment/commentSlice";
import { commentsReducer } from "./slices/comments/commentsSlice";
import { feedbackReducer } from "./slices/feedback/feedbackSlice";
import {
  clearFeedbackError,
  feedbacksReducer,
} from "./slices/feedbacks/feedbackSlices";
import { replyReducer } from "./slices/replies/replySlice";
import { optionChange, sortOptionReducer } from "./slices/sortOptionSlice";
import { createUser } from "./thunks/auth/createUser";
import { fetchUsers } from "./thunks/auth/fetchUsers";
import { createComment } from "./thunks/comment/createComment";
import { fetchCommentreplies } from "./thunks/comments/fetchCommentReplies";
import { createFeedback } from "./thunks/feedbacks/createFeedback";
import { deleteFeedback } from "./thunks/feedbacks/deleteFeedback";
import { fetchFeedbacks } from "./thunks/feedbacks/fetchFeedbacks";
import { fetchFeedbackWithComments } from "./thunks/feedbacks/fetchFeedbackWithComments";
import { updateFeedback } from "./thunks/feedbacks/updateFeedback";
import { createReply } from "./thunks/replies/createReply";

const store = configureStore({
  reducer: {
    feedbacks: feedbacksReducer,
    feedback: feedbackReducer,
    sortOption: sortOptionReducer,
    auth: authReducer,
    users: usersReducer,
    comments: commentsReducer,
    comment: commentReducer,
    reply: replyReducer
  },
});

console.log("store ", store.getState());

export {
  store,
  optionChange,
  createUser,
  clearError,
  logout,
  fetchFeedbacks,
  createFeedback,
  clearFeedbackError,
  fetchFeedbackWithComments,
  fetchUsers,
  fetchCommentreplies,
  updateFeedback,
  createReply,
  deleteFeedback,
  createComment
};
