import { useContext, useState } from 'react';
import classNames from 'classnames';
import './style.css'
import { GameContext } from '../../../context';

function Cell({ 
    index, 
    fillCells, 
    cell, 
    flag, 
    clickedCell, 
    rightClickCell 
  }) {
  const [mouseDown, setMouseDown] = useState(false);
  const { clicked, gameResult } = useContext(GameContext);

  const contextHandler = (e) => {
    e.preventDefault();
    if (!cell || cell.open || gameResult) {
      return;
    }
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


  const classCell = classNames('cell', gameResult, {
    [`open-${cell.cell}`] : cell.open,
    'down'                : mouseDown,
    [`flag-${cell.flag}`] : cell.flag,
    'activate-mine'       : cell.activate,
    'wrong'               : cell.wrong
  });

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
