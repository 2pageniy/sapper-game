import { useEffect, useState, useContext } from 'react';
import { GameContext } from '../../context';
import Cell from './Cell';
import getRandomInt from '../../utils/randomNumber';
import { QUANTITY_MINES, SIZE_FIELD } from '../../consts';
import './style.css'

function Field() {
  const [cells, setCells] = useState(Array.from(Array(SIZE_FIELD), () => new Array(SIZE_FIELD).fill(0)));
  const [filledCells, setFilledCells] = useState(false);
  const {setGameResult, restart, setRestart, setMines, mines, setSeconds} = useContext(GameContext);
  const [timer, setTimer] = useState();

  const fillCells = (index) => {
    setTimer(setInterval(() => setSeconds((prev) => prev !== 999 ? prev + 1 : prev), 1000));
    setFilledCells(true);
    const temp = Array.from(Array(SIZE_FIELD), () => new Array(SIZE_FIELD));
    let i = 0;
    while (i < mines) {
      const randomCellI = getRandomInt(0, SIZE_FIELD);
      const randomCellJ = getRandomInt(0, SIZE_FIELD);
      if (randomCellI === index[0] && randomCellJ === index[1]) {
        continue;
      }
      if (!temp[randomCellI][randomCellJ]) {
        temp[randomCellI][randomCellJ] = {
          cell: 'mine',
          open: false,
          flag: 0,
          activate: false,
          wrong: false,
        };
        i++;
      }
    }

    for (let i = 0; i < SIZE_FIELD; i++) {
      for (let j = 0; j < SIZE_FIELD; j++) {
        if (temp[i][j]?.cell === 'mine') {
          continue;
        }

        let allMines = 0;
        if (temp[i]?.[j + 1]?.cell     === 'mine') allMines++;
        if (temp[i]?.[j - 1]?.cell     === 'mine') allMines++;
        if (temp[i + 1]?.[j - 1]?.cell === 'mine') allMines++;
        if (temp[i + 1]?.[j]?.cell     === 'mine') allMines++;
        if (temp[i + 1]?.[j + 1]?.cell === 'mine') allMines++;
        if (temp[i - 1]?.[j - 1]?.cell === 'mine') allMines++;
        if (temp[i - 1]?.[j]?.cell     === 'mine') allMines++;
        if (temp[i - 1]?.[j + 1]?.cell === 'mine') allMines++;

        temp[i][j] = {
          cell: allMines,
          open: false,
          flag: 0,
          activate: false,
          wrong: false,
        }
      }
    }
    clickCellHandler(index, temp);
  };

  const clickedCell = (idx) => {
    clickCellHandler(idx, cells);
  };

  const clickCellHandler = (idx, cells) => {
    const temp = [...cells];
    const i = idx[0];
    const j = idx[1];
    temp[i][j].open = true;

    if (temp[i][j].cell === 0) {
      // Проверяем чтобы поле существовало, было закрыто и не было на нем флага или вопроса
      if (temp[i]?.[j + 1]     && !temp[i][j + 1]?.open     && !temp[i][j + 1]?.flag)     clickCellHandler([i, j + 1], temp);
      if (temp[i]?.[j - 1]     && !temp[i][j - 1]?.open     && !temp[i][j - 1]?.flag)     clickCellHandler([i, j - 1], temp);
      if (temp[i + 1]?.[j - 1] && !temp[i + 1][j - 1]?.open && !temp[i + 1][j - 1]?.flag) clickCellHandler([i + 1, j - 1], temp);
      if (temp[i + 1]?.[j]     && !temp[i + 1][j]?.open     && !temp[i + 1][j]?.flag)     clickCellHandler([i + 1, j], temp);
      if (temp[i + 1]?.[j + 1] && !temp[i + 1][j + 1]?.open && !temp[i + 1][j + 1].flag)  clickCellHandler([i + 1, j + 1], temp);
      if (temp[i - 1]?.[j - 1] && !temp[i - 1][j - 1]?.open && !temp[i - 1][j - 1]?.flag) clickCellHandler([i - 1, j - 1], temp);
      if (temp[i - 1]?.[j]     && !temp[i - 1][j]?.open     && !temp[i - 1][j]?.flag)     clickCellHandler([i - 1, j], temp);
      if (temp[i - 1]?.[j + 1] && !temp[i - 1][j + 1]?.open && !temp[i - 1][j + 1]?.flag) clickCellHandler([i - 1, j + 1], temp);
    }

    if (temp[i][j].cell === 'mine') {
      setGameResult('lose');
      clearInterval(timer);
      temp[i][j].activate = true;
      for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < temp[i].length; j++) {
          if (temp[i][j].flag === 1 && temp[i][j].cell !== 'mine') {
            temp[i][j].wrong = true;
          }
          if (temp[i][j].cell === 'mine') {
            temp[i][j].open = true;
          }
        }
      }
    } else {
      let count = 0;
      for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < temp[i].length; j++) {
          if (!temp[i][j].open) {
            count++;
          }
        }
      }
      if (count === QUANTITY_MINES) {
        clearInterval(timer);
        setGameResult('win');
      }
    }

    
    setCells([...temp])
  };

  const rightClickCell = (idx) => {
    const temp = [...cells];
    if (temp[idx[0]][idx[1]].flag + 1 === 1 && mines === 0) {
      return;
    }
    temp[idx[0]][idx[1]].flag = (temp[idx[0]][idx[1]].flag + 1) % 3;
    if (temp[idx[0]][idx[1]].flag === 1) {
      setMines((prev) => prev - 1);
    } else if (temp[idx[0]][idx[1]].flag === 2){
      setMines((prev) => prev + 1);
    }
    setCells(temp);
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
    <div className="field">
      {cells.map((cell, i) => {
        return (
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
      }
      )}
    </div>
  );
}

export default Field;
