import { useEffect, useState } from "react";
import './GameTable.css';

function GameTable() {
  const [categories, setCategories] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    // Fetch multiple categories (mock example for Jeopardy)
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://opentdb.com/api_category.php");
      const data = await response.json();
      setCategories(data.trivia_categories.slice(0, 5)); // Limit to 5 categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchQuestion = async (categoryId, pointValue) => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=1&category=${categoryId}`
      );
      const data = await response.json();
      setSelectedQuestion({
        question: data.results[0].question,
        answer: data.results[0].correct_answer,
        points: pointValue,
      });
      setShowAnswer(false);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  return (
    <div>
      <h1>Jeopardy Game Table</h1>
      <table className="game-table">
        <thead>
          <tr>
            {categories.map((category) => (
              <th key={category.id}>{category.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[100, 200, 300, 400, 500].map((points) => (
            <tr key={points}>
              {categories.map((category) => (
                <td
                  key={category.id + points}
                  onClick={() => fetchQuestion(category.id, points)}
                  className="point-cell"
                >
                  {points}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedQuestion && (
        <div className="question-container">
          <h2 dangerouslySetInnerHTML={{ __html: selectedQuestion.question }} />
          <p>Points: {selectedQuestion.points}</p>
          <button onClick={() => setShowAnswer(true)}>Show Answer</button>
          {showAnswer && (
            <p
              className="answer"
              dangerouslySetInnerHTML={{ __html: selectedQuestion.answer }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default GameTable;
