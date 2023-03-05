export const openCell = (idx, cells) => {
  let temp = [...cells];
  const i = idx[0];
  const j = idx[1];
  const pressedCell = temp[idx[0]][idx[1]];
  pressedCell.open = true;

  if (pressedCell.cell === 0) {
    // Проверяем чтобы поле существовало, было закрыто и не было на нем флага или вопроса
    if (temp[i]?.[j + 1]     && !temp[i][j + 1]?.open     && !temp[i][j + 1]?.flag)     openCell([i, j + 1], temp);
    if (temp[i]?.[j - 1]     && !temp[i][j - 1]?.open     && !temp[i][j - 1]?.flag)     openCell([i, j - 1], temp);
    if (temp[i + 1]?.[j - 1] && !temp[i + 1][j - 1]?.open && !temp[i + 1][j - 1]?.flag) openCell([i + 1, j - 1], temp);
    if (temp[i + 1]?.[j]     && !temp[i + 1][j]?.open     && !temp[i + 1][j]?.flag)     openCell([i + 1, j], temp);
    if (temp[i + 1]?.[j + 1] && !temp[i + 1][j + 1]?.open && !temp[i + 1][j + 1].flag)  openCell([i + 1, j + 1], temp);
    if (temp[i - 1]?.[j - 1] && !temp[i - 1][j - 1]?.open && !temp[i - 1][j - 1]?.flag) openCell([i - 1, j - 1], temp);
    if (temp[i - 1]?.[j]     && !temp[i - 1][j]?.open     && !temp[i - 1][j]?.flag)     openCell([i - 1, j], temp);
    if (temp[i - 1]?.[j + 1] && !temp[i - 1][j + 1]?.open && !temp[i - 1][j + 1]?.flag) openCell([i - 1, j + 1], temp);
  }

  return temp;
}

export const loseGame = (idx, cells) => {
  const temp = [...cells];
  const pressedCell = temp[idx[0]][idx[1]];

  pressedCell.activate = true;
  for (let i = 0; i < temp.length; i++) {
    for (let j = 0; j < temp[i].length; j++) {
      const currentCell = temp[i][j];
      if (currentCell.flag === 1 && currentCell.cell !== 'mine') {
        currentCell.wrong = true;
      }
      if (currentCell.cell === 'mine') {
        currentCell.open = true;
      }
    }
  }
  return temp;
};

export const winGame = (cells) => {
  const temp = [...cells];
  let count = 0;
  for (let i = 0; i < temp.length; i++) {
    for (let j = 0; j < temp[i].length; j++) {
      const currentCell = temp[i][j];
      if (!currentCell.open) {
        count++;
      }
    }
  }
  return count;
};