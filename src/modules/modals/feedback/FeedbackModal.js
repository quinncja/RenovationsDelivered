import { close } from "business/svg";
import { useState } from "react";
import { toast } from "sonner";
import Userfront from "@userfront/toolkit";
import { submitFeedback } from "utils/api";

function FeedbackModal({ closeSelf }) {
  const [type, setType] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorStates, setError] = useState({
    type: false,
    suggestion: false,
  });

  const inputText = {
    type: errorStates.type ? "Please select a type" : "Type",
    suggestion: errorStates.suggestion ? "Please enter feedback" : "Feedback",
  };

  const typeObj = {
    text: inputText.type,
    error: errorStates.type,
  };

  const suggestionObj = {
    text: inputText.suggestion,
    error: errorStates.suggestion,
  };

  const formValidator = () => {
    let isError = false;

    if (!type) {
      setError((prev) => ({ ...prev, type: true }));
      isError = true;
    }

    if (!suggestion.trim()) {
      setError((prev) => ({ ...prev, suggestion: true }));
      isError = true;
    }

    return isError;
  };

  const onSubmit = () => {
    if (!formValidator()) {
      setLoading(true);
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const submission = {
        type,
        message: suggestion,
        user: Userfront.user.name,
      };
      await submitFeedback(submission);
      toast.success("Thank you for your feedback");
      closeSelf();
    } catch (error) {
      toast.error("Failed to submit feedback");
      console.log("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeClick = (selectedType) => {
    setType(selectedType);
    setError((prev) => ({ ...prev, type: false }));
  };

  const handleSuggestionChange = (e) => {
    setSuggestion(e.target.value);
    setError((prev) => ({ ...prev, suggestion: false }));
  };

  return (
    <div className="popup-wrapper">
      <div className="new-widget-popup" onClick={(e) => e.stopPropagation()}>
        <div className="widget-top new-widget-top feedback-top">
          <h2>Submit Feedback</h2>
          <label> How your dashboard can be improved? </label>
          <button className="x-button widget-item" onClick={closeSelf}>
            {close()}
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="feedback-input-group">
            <label className={`${typeObj.error ? "input-error-tag" : ""}`}>
              {typeObj.text}
            </label>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <button
                className={`${
                  type === "Bug" ? "feedback-active" : ""
                } job-button feedback-button ${
                  typeObj.error ? "input-error" : ""
                }`}
                onClick={() => handleTypeClick("Bug")}
              >
                Bug
              </button>
              <button
                className={`${
                  type === "Suggestion" ? "feedback-active" : ""
                } job-button feedback-button ${
                  typeObj.error ? "input-error" : ""
                }`}
                onClick={() => handleTypeClick("Suggestion")}
              >
                Suggestion
              </button>
            </div>
          </div>

          <div className="feedback-input-group">
            <label
              className={`${suggestionObj.error ? "input-error-tag" : ""}`}
            >
              {suggestionObj.text}
            </label>
            <textarea
              placeholder="Type your message here"
              className={`feedback-textarea ${
                suggestionObj.error ? "input-error" : ""
              }`}
              value={suggestion}
              onChange={handleSuggestionChange}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: "20px",
          }}
        >
          <button
            className={`job-button ${loading ? "btn-disabled" : ""}`}
            style={{ justifySelf: "center", width: "120px" }}
            onClick={onSubmit}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackModal;
