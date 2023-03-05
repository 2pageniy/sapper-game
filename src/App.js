import { useState } from 'react';
import Header from './components/Header';
import Field from './components/Field';
import './App.css';
import { GameContext } from './context';
import { QUANTITY_MINES } from './consts';

function App() {
  const [restart, setRestart] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [mines, setMines] = useState(QUANTITY_MINES);
  const [clicked, setClicked] = useState(false);

  const mouseDownHandler = (e) => {
    if (e.button !== 0 || gameResult) return;
    e.preventDefault();
    setClicked(true);
  };

  const mouseUpHandler = (e) => {
    if (e.button !== 0 || gameResult) return;
    e.preventDefault();
    setClicked(false);
  };

  return (
    <GameContext.Provider
      value={{
        restart,
        setRestart,
        mines,
        setMines,
        seconds,
        setSeconds,
        clicked,
        gameResult,
        setGameResult,
      }}
    >
      <div
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        className="wrapper-app"
      >
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
