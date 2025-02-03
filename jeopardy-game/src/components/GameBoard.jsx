import React from "react";
import "./GameBoard.css";

const GameBoard = ({ categories, questions, onQuestionClick }) => {
  // Group questions by category
  const groupedQuestions = categories.map((category) => ({
    category,
    questions: questions
      .filter((q) => q.category === category)
      .slice(0, 5) // 5 questions per category
      .map((q, index) => ({ ...q, value: (index + 1) * 100 })), // $100 to $500
  }));

  return (
    <table className="game-board">
      <thead>
        <tr>
          {groupedQuestions.map((group, index) => (
            <th key={index} className="category-header">
              {group.category}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[0, 1, 2, 3, 4].map((rowIndex) => (
          <tr key={rowIndex}>
            {groupedQuestions.map((group, colIndex) => {
              const question = group.questions[rowIndex];
              return (
                <td key={colIndex} className="question-cell">
                  {question ? (
                    <button
                      className="question-button"
                      onClick={() => onQuestionClick(question)}
                    >
                      ${question.value}
                    </button>
                  ) : (
                    <div className="empty-cell"></div>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GameBoard;