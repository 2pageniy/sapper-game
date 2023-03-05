import { useEffect, useState, useContext } from 'react';
import Cell from './Cell';
import './style.css'
import { GameContext } from '../../context';
import { loseGame, winGame, openCell } from '../../utils/handlerClick';
import fillArrayCells from '../../utils/fillArrayCells';
import { QUANTITY_MINES, SIZE_FIELD } from '../../consts';

function Field() {
  const [cells, setCells] = useState(Array.from(Array(SIZE_FIELD), () => new Array(SIZE_FIELD).fill(0)));
  const [filledCells, setFilledCells] = useState(false);
  const { 
    setGameResult, 
    restart, 
    setRestart, 
    setMines, 
    mines, 
    setSeconds 
  } = useContext(GameContext);
  const [timer, setTimer] = useState();

  const fillCells = (index) => {
    setTimer(setInterval(() => setSeconds((prev) => prev !== 999 ? prev + 1 : prev), 1000));
    setFilledCells(true);
    const temp = fillArrayCells(index);
    clickCellHandler(index, temp);
  };

  const clickedCell = (idx) => {
    clickCellHandler(idx, cells);
  };

  const clickCellHandler = (idx, cells) => {
    let temp = openCell(idx, cells);
    const i = idx[0];
    const j = idx[1];
    const pressedCell = temp[i][j];

    if (pressedCell.cell === 'mine') {
      setGameResult('lose');
      clearInterval(timer);
      temp = [...loseGame(idx, cells)];
    } else {
      const count = winGame(cells);
      if (count === QUANTITY_MINES) {
        clearInterval(timer);
        setGameResult('win');
      }
    }
    setCells([...temp])
  };

  const rightClickCell = (idx) => {
    const temp = [...cells];
    const pressedCell = temp[idx[0]][idx[1]];

    if (pressedCell.flag + 1 === 1 && mines === 0) {
      return;
    }

    pressedCell.flag = (pressedCell.flag + 1) % 3;

    if (pressedCell.flag === 1) {
      setMines((prev) => prev - 1);
    } else if (pressedCell.flag === 2){
      setMines((prev) => prev + 1);
    }

    setCells([...temp]);
  };

  useEffect(() => {
    if (restart) {
      setFilledCells(false);
      setRestart(false);
      setCells(Array.from(Array(SIZE_FIELD), () => new Array(SIZE_FIELD).fill(0)));
      setGameResult(null);
      setMines(QUANTITY_MINES);
      setSeconds(0);
      clearInterval(timer);
    }
  }, [restart])

  return (
    <div className='field'>
      {cells.map((cell, i) => (
          cell.map((c, j) => 
          <Cell 
            key={i + j} 
            index={[i, j]}
            cell={c}
            fillCells={fillCells}
            flag={filledCells}
            clickedCell={clickedCell}
            rightClickCell={rightClickCell}
          />
        )
      )
      )}
    </div>
  );
}

export default Field;
