import React from "react";
import Question from "./Question";
import "./Category.css";

const Category = ({ title, questions, onQuestionClick }) => {
  return (
    <div className="category">
      <h3 className="category-title">{title}</h3>
      <div className="questions">
        {questions.map((question) => (
          <Question
            key={question.value}
            value={question.value}
            onClick={() => onQuestionClick(question)}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;