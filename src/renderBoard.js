import Battleship from "./battleship";

function renderBoard(board, container){
  for (let i = 0; i < board.length; i++) {
    const col = board[i];


    for (let j = 0; j < col.length; j++) {
      const row = col[j];
      const rowCell = document.createElement('div')
      rowCell.classList.add('cell')
      rowCell.setAttribute('coord', `${i} ${j}`)
      if (Object.getPrototypeOf(board[i][j]) === Battleship.prototype) {
        rowCell.innerHTML = `ship [${[i]},${j}]`
      } else {
        rowCell.innerHTML = `[${[i]},${j}]`
      }
      container.append(rowCell)
    }
  }
}




export {renderBoard};