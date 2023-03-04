import { useState } from "react";
import Header from "./components/Header";
import Field from "./components/Field";
import { GameContext } from "./context";
import "./App.css";

function App() {
  const [restart, setRestart] = useState(false);
  const [lose, setLose] = useState(false);
  const [win, setWin] = useState(false);
  const [mines, setMines] = useState(40);

  return (
    <GameContext.Provider
      value={{
        restart,
        setRestart,
        lose,
        setLose,
        win,
        setWin,
        mines,
        setMines,
      }}
    >
      <div className="wrapper-app">
        <div className="app">
          <Header />
          <div className="transfer" />
          <Field />
        </div>
      </div>
    </GameContext.Provider>
  );
}

export default App;
