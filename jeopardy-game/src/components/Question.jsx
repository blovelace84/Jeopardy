import React from "react";
import "./Question.css";

const Question = ({ value, onClick }) => {
  return (
    <div className="question" onClick={onClick}>
      ${value}
    </div>
  );
};

export default Question;