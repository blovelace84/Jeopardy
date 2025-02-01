import { useEffect, useState } from "react";

function GameTable() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchQuestions = async () => {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=10", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data.results || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching questions:", error);
        }
      }
    };

    fetchQuestions();

    // Cleanup fetch on component unmount
    return () => controller.abort();
  }, []);

  const getNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < questions.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div>
      {questions.length > 0 ? (
        <div>
          <h2 dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />
          <button onClick={getNextQuestion}>Next Question</button>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}

export default GameTable;
