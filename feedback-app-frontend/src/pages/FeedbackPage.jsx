import LogoComponent from "../components/LogoComponent";
import NavBar from "../components/NavBar";
import FeedbackList from "../components/feedbacks/FeedbackList";
import FeedbackCategories from "../components/feedbacks/FeedbackCategories";
import RoadmapSummary from "../components/roadmaps/RoadmapSummary";

const FeedbackPage = () => {
  return (
    <div
      id="feedback-main-page"
      className="row d-flex flex-column flex-lg-row align-items-start"
    >
      <aside className="col-lg-3 col mb-2 d-flex flex-lg-column flex-row align-items-center justify-content-between align-items-lg-start">
        <LogoComponent /> <FeedbackCategories /> <RoadmapSummary />
      </aside>
      <main className="col-lg-9 col">
        <NavBar />
        <FeedbackList />
      </main>
    </div>
  );
};

export default FeedbackPage;
