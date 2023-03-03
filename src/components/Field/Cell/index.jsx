import { useState } from 'react';
import './style.css'

function Cell({index, fillCells}) {
  const [opened, setOpened] = useState(false);


  const clickCellHandler = () => {
    fillCells(index);
  };

  return (
    <div
      onClick={clickCellHandler}
      className={`cell ${opened && 'open'}`}
    >
      {opened && index}
    </div>
  );
}

export default Cell;
