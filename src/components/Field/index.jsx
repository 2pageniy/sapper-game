import { useEffect, useState } from 'react';
import Cell from './Cell';
import getRandomInt from '../../utils/randomNumber';
import './style.css'

function Field() {
  const [cells, setCells] = useState(new Array(256).fill(0));
/*
  {
    cell: mine | empty | number,
    clicked: false | true
  }
*/
  useEffect(() => {
    // console.log(cells)
  }, [])

  const fillCells = (index) => {
    const temp = new Array(256);
    for (let i = 0; i < 40; i++) {
      const mine = {
        cell: 'mine',
        clicked: false,
      }
      const randomCell = getRandomInt(0, 256, index);
      temp[randomCell] = mine;
    }

    for (let i = 0; i < 16*16; i++) {
      if (temp[i]?.cell === 'mine') {
        continue;
      }
    }
  };

  return (
    <div className="field">
      {cells.map((cell, i) => 
        <Cell 
          key={i} 
          index={i} 
          fillCells={fillCells}
        />
      )}
    </div>
  );
}

export default Field;
