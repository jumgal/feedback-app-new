import { feedbackCategories } from "../../data/feedbackCategories";

const FeedbackCategories = () => {
  return (
    <section
      id="feedback-categories"
      className="rounded w-100 bg-color-light-second my-4 p-3"
    >
      {feedbackCategories.map((category, index) => {
        return (
          <button key={index} className="btn btn-color-light-first fw-bold text-color-blue px-3 py-2">
            {category}
          </button>
        );
      })}
    </section>
  );
};

export default FeedbackCategories;
