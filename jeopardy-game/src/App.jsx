import React, {useState} from "react";
import GameTable from "./components/GameTable";
import './App.css';
import Scoreboard from "./components/Scoreboard";

const App = () => {
  const [score, setScore] = useState(0);

  const handleScoreUpdate = (points) => {
    setScore((prevScore) => prevScore + points);
  };

  return(
    <div className="App">
      <h1>This is Jeopardy!</h1>
      <Scoreboard score={score}/>
      <GameTable onScoreUpdate={handleScoreUpdate}/>
    </div>
  );
}

export default App;