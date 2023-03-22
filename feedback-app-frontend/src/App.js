import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeNavbar from "./components/HomeNavbar";
import PrivateRoute from "./components/PrivateRoute";
import EditFeedbackPage from "./pages/EditFeedbackPage";
import FeedbackPage from "./pages/FeedbackPage";
import { FeedbackSingle } from "./pages/FeedbackSingle";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewFeedbackPage from "./pages/NewFeedbackPage";
import RegisterPage from "./pages/RegisterPage";
import ReplyPage from "./pages/ReplyPage";
import RoadMapPage from "./pages/RoadMapPage";
import Users from "./pages/Users";

function App() {
  return (
    <Router>
      <div className="container app-container w-75 m-auto">
        <HomeNavbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/feedbacks" element={<PrivateRoute />}>
            <Route path="/feedbacks" element={<FeedbackPage />} />
          </Route>
          <Route path="/feedbacks/:feedbackId" element={<PrivateRoute />}>
            <Route path="/feedbacks/:feedbackId" element={<FeedbackSingle />} />
          </Route>
          <Route path="/feedback/:feedbackId" element={<PrivateRoute />}>
            <Route path="/feedback/:feedbackId" element={<EditFeedbackPage />} />
          </Route>
          <Route path="/new-feedback" element={<PrivateRoute />}>
            <Route path="/new-feedback" element={<NewFeedbackPage />} />
          </Route>
          <Route path="/reply/:commentId" element={<PrivateRoute />}>
            <Route path="/reply/:commentId" element={<ReplyPage/>} />
          </Route>
          <Route path="/users" element={<PrivateRoute />}>
            <Route path="/users" element={<Users />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/roadmap" element={<RoadMapPage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
