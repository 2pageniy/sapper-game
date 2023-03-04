import './style.css'

function Cell({ index, fillCells, cell, flag, clickedCell, rightClickCell, lose }) {
  
  
  const clickCellHandler = () => {
    if (!flag) {
      fillCells(index);
      return;
    }
    if (cell.flag || lose) return;
    clickedCell(index);
  };

  const contextHandler = (e) => {
    e.preventDefault();
    if (cell.clicked || lose) return;
    rightClickCell(index)
  };
  
  const classCell = `cell${cell.clicked ? ` open-${cell.cell}` : ''}${cell.flag ? ` flag-${cell.flag}` : ''}${cell.activate ? ` activate-mine` : ''}${lose ? ` lose` : ''}${cell.wrong ? ' wrong' : ''}`;

  return (
    <div
      onClick={clickCellHandler}
      onContextMenu={contextHandler}
      className={classCell}
    >
    </div>
  );
}

export default Cell;
