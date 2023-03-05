import { SIZE_FIELD, QUANTITY_MINES } from "../consts";
import getRandomInt from "./randomNumber";

export default function fillArrayCells(index) {
  const temp = Array.from(Array(SIZE_FIELD), () => new Array(SIZE_FIELD));
    let i = 0;
    while (i < QUANTITY_MINES) {
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
    return temp;
};
