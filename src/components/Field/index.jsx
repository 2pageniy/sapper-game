import { useEffect, useState } from 'react';
import Cell from './Cell';
import getRandomInt from '../../utils/randomNumber';
import './style.css'

function Field() {
  const size = 16;
  const [cells, setCells] = useState(Array.from(Array(size), () => new Array(size).fill(0)));
  const [minesPos, setMinesPos] = useState([]);
  const [flag, setFlag] = useState(false);
/*
  {
    cell: mine | number,
    clicked: false | true,
    flag: 0 (empty) | 1 (flag) | 2 (question)
  }
*/

  const fillCells = (index) => {
    setFlag(true);
    const temp = Array.from(Array(size), () => new Array(size));
    let i = 0;
    while (i < 40) {
      const randomCellI = getRandomInt(0, size);
      const randomCellJ = getRandomInt(0, size);
      if (randomCellI === index[0] && randomCellJ === index[1]) {
        continue;
      }
      if (!temp[randomCellI][randomCellJ]) {
        const mine = {
          cell: 'mine',
          clicked: false,
          flag: 0,
          activate: false,
        }
        temp[randomCellI][randomCellJ] = mine;
        setMinesPos((prev) => [...prev, [randomCellI, randomCellJ]]);
        i++;
      }
    }

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
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
          clicked: false,
          flag: 0,
          activate: false
        }
      }
    }
    setCells(temp);
  };

  const clickedCell = (idx) => {
    const temp = [...cells];
    const i = idx[0];
    const j = idx[1];
    temp[i][j].clicked = true;

    if (cells[i][j].cell === 0) {
      if (cells[i]?.[j + 1]     && !cells[i]?.[j + 1]?.clicked)     clickedCell([i, j + 1]);
      if (cells[i]?.[j - 1]     && !cells[i]?.[j - 1]?.clicked)     clickedCell([i, j - 1]);
      if (cells[i + 1]?.[j - 1] && !cells[i + 1]?.[j - 1]?.clicked) clickedCell([i + 1, j - 1]);
      if (cells[i + 1]?.[j]     && !cells[i + 1]?.[j]?.clicked)     clickedCell([i + 1, j]);
      if (cells[i + 1]?.[j + 1] && !cells[i + 1]?.[j + 1]?.clicked) clickedCell([i + 1, j + 1]);
      if (cells[i - 1]?.[j - 1] && !cells[i - 1]?.[j - 1]?.clicked) clickedCell([i - 1, j - 1]);
      if (cells[i - 1]?.[j]     && !cells[i - 1]?.[j]?.clicked)     clickedCell([i - 1, j]);
      if (cells[i - 1]?.[j + 1] && !cells[i - 1]?.[j + 1]?.clicked) clickedCell([i - 1, j + 1]);
    }

    if (cells[i][j].cell === 'mine') {
      temp[i][j].activate = true;
      for (let i = 0; i < minesPos.length; i++) {
        const firstPos = minesPos[i][0];
        const secondPos = minesPos[i][1];
        temp[firstPos][secondPos].clicked = true;
      }
    }
    setCells([...temp])
  };

  const rightClickCell = (idx) => {
    const temp = [...cells];
    temp[idx[0]][idx[1]].flag = (temp[idx[0]][idx[1]].flag + 1) % 3;
    setCells(temp);
  };

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
            flag={flag}
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
