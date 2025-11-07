import { useEffect, useState } from "react";
import { toast } from "sonner";
import Feedback from "./Feedback";
import { deleteFeedback, fetchFeedback } from "../api/feedbackApi";

function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState();

  const sortedFeedbacks = feedbacks
    ? [...feedbacks].sort(
        (a, b) => new Date(b.date_submitted) - new Date(a.date_submitted),
      )
    : null;

  const handleDelete = async (id) => {
    try {
      await deleteFeedback(id);
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.filter((item) => item._id !== id),
      );
      toast.success("Feedback deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete feedback");
    }
  };

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const response = await fetchFeedback();
        setFeedbacks(response.data);
      } catch (error) {
        toast.error("Failed to load feeback data");
      }
    };

    loadFeedback();
  }, []);

  return (
    <div className="dashboard-welcome user-page">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "baseline",
          gap: ".5rem",
        }}
      >
        {" "}
        <div className="jobs-header jobs-header-old">
          <div style={{ display: "flex", alignItems: "baseline", gap: "15px" }}>
            <h2> Feedback </h2>
          </div>
        </div>
      </div>

      {!sortedFeedbacks ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "50vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className={`home-widget-num ${"home-widget-loading"}`}></span>
        </div>
      ) : sortedFeedbacks.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          {sortedFeedbacks.map((item) => {
            return (
              <Feedback item={item} deleteSelf={(id) => handleDelete(id)} />
            );
          })}
        </div>
      ) : (
        <p
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            fontWeight: 600,
            paddingLeft: "3px",
          }}
        >
          Nothing to show
        </p>
      )}
    </div>
  );
}

export default FeedbackPage;
