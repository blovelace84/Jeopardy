import React, { useState, useEffect } from "react";
import "./GameTable.css";

function GameTable({ onScoreUpdate }) {
  const [categories, setCategories] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // Fetch categories and questions on load
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.results.map((item, index) => ({
          category: item.category,
          question: item.question,
          answer: item.correct_answer,
          points: (index + 1) * 100,
        }));
        setCategories(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleQuestionClick = (data) => {
    setActiveQuestion(data);
    setShowAnswer(false);
  };

  return (
    <div>
      <table className="game-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((data, index) => (
            <tr key={index}>
              <td>{data.category}</td>
              <td onClick={() => handleQuestionClick(data)}>{data.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {activeQuestion && (
        <div className="question-container">
          <h2 dangerouslySetInnerHTML={{ __html: activeQuestion.question }} />
          <button onClick={() => onScoreUpdate(activeQuestion.points)}>Correct</button>
          <button onClick={() => onScoreUpdate(-activeQuestion.points)}>Incorrect</button>
          <button onClick={() => setShowAnswer(true)}>Show Answer</button>
          {showAnswer && (
            <p>
              <strong>Answer:</strong>{" "}
              <span dangerouslySetInnerHTML={{ __html: activeQuestion.answer }} />
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default GameTable;
