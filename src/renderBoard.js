import Battleship from "./battleship";

function renderBoard(board, container){
  console.log(board.length)
  for (let i = 0; i < board.length; i++) {
    const col = board[i];


    for (let j = 0; j < col.length; j++) {
      const row = col[j];
      const rowCell = document.createElement('div')
      if (Object.getPrototypeOf(board[i][j]) === Battleship.prototype) {
        rowCell.innerHTML = 's'
      } else {
        rowCell.innerHTML = '0'
      }
      container.append(rowCell)
    }
  }
}


export {renderBoard};