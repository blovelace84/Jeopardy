import React, { useState } from "react";
import "./QuestionModal.css";

const QuestionModal = ({ question, onClose, onSubmit }) => {
  const [userAnswer, setUserAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userAnswer);
    setUserAnswer("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{question.question}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Your answer..."
          />
          <div className="modal-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionModal;