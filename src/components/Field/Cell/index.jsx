import { useState } from 'react';
import './style.css'

function Cell({ index, fillCells, cell, flag, clickedCell, rightClickCell }) {
  const [opened, setOpened] = useState(false);


  const clickCellHandler = () => {
    if (!flag) {
      fillCells(index);
      return;
    }
    if (cell.flag) return;
    clickedCell(index);
  };

  const contextHandler = (e) => {
    e.preventDefault();
    if (cell.clicked) return;
    rightClickCell(index)
  };

  return (
    <div
      onClick={clickCellHandler}
      onContextMenu={contextHandler}
      className={`cell${cell.clicked ? ` open-${cell.cell}` : ''}${cell.flag ? ` flag-${cell.flag}` : ''}${cell.activate ? ` activate-mine` : ''}`}
    >
      {/* {cell.clicked && <div className='flag'/>} */}
      {/* {cell.cell} */}
    </div>
  );
}

export default Cell;
