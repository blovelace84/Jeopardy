import React from "react";
import GameTable from "./components/GameTable";
import './App.css';

const App = () => {
  return(
    <div className="App">
      <h1>This is Jeopardy!</h1>
      <GameTable />
    </div>
  );
}

export default App;