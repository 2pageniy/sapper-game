import { useContext, useState } from 'react';
import { GameContext } from '../../../context';
import './style.css'

function Cell({ index, fillCells, cell, flag, clickedCell, rightClickCell }) {
  const [mouseDown, setMouseDown] = useState(false);
  const { clicked, gameResult } = useContext(GameContext);

  const contextHandler = (e) => {
    e.preventDefault();
    if (!cell || cell.open || gameResult) return;
    rightClickCell(index)
  };

  const mouseDownHandler = (e) => {
    if (e.button !== 0 || gameResult) {
      return;
    }
    e.preventDefault();
    setMouseDown(true);
  };

  const mouseUpHandler = (e) => {
    if (e.button !== 0) {
      return;
    }
    e.preventDefault();
    setMouseDown(false);
    if (!flag) {
      fillCells(index);
      return;
    }
    if (cell.flag || gameResult) return;
    clickedCell(index);
  };

  const mouseLeaveHandler = () => {
    setMouseDown(false);
  };

  const mouseEnterHandler = () => {
    if (clicked && !gameResult) {
      setMouseDown(true);
    }
  };
  
  const classCell = `cell${cell.open ? ` open-${cell.cell}` : ''}${mouseDown ? ' down' : ''}${cell.flag ? ` flag-${cell.flag}` : ''}${cell.activate ? ` activate-mine` : ''} ${gameResult || ''}${cell.wrong ? ' wrong' : ''}`;

  return (
    <div
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseEnter={mouseEnterHandler}
      onContextMenu={contextHandler}
      className={classCell}
    >
    </div>
  );
}

export default Cell;
