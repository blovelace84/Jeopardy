import React, { useState, useEffect } from "react";
import axios from "axios";
import GameBoard from "./components/GameBoard";
import Score from "./components/Score";
import QuestionModal from "./components/QuestionModal";
import "./App.css";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch 30 questions (6 categories × 5 questions)
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=10"
        );
        const fetchedQuestions = response.data.results;

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(fetchedQuestions.map((q) => q.category)),
        ].slice(0, 6); // Limit to 6 categories

        setCategories(uniqueCategories);
        setQuestions(fetchedQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  const checkAnswer = (userAnswer) => {
    if (!selectedQuestion) return;

    const isCorrect =
      userAnswer.toLowerCase() ===
      selectedQuestion.correct_answer.toLowerCase();

    if (isCorrect) {
      setScore(score + 100);
      alert("Correct!");
    } else {
      setScore(score - 100);
      alert(`Wrong! Correct answer: ${selectedQuestion.correct_answer}`);
    }
    setSelectedQuestion(null);
  };

  return (
    <div className="app">
      <h1>Jeopardy!</h1>
      <Score score={score} />
      {loading ? (
        <div>Loading questions...</div>
      ) : (
        <GameBoard
          categories={categories}
          questions={questions}
          onQuestionClick={handleQuestionClick}
        />
      )}
      {selectedQuestion && (
        <QuestionModal
          question={selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
          onSubmit={checkAnswer}
        />
      )}
    </div>
  );
};

export default App;