import Battleship from "./battleship";

function renderBoard(board, container){
  const boardNodes = container.children
  const grid = board.grid
  let k = 0
  for (let i = 0; i < grid.length; i++) {
    const col = grid[i];


    for (let j = 0; j < col.length; j++) {
      const node = boardNodes[k]
      if (renderHit(board.hitShots,[i,j])) {
        node.setAttribute('style','pointer-events: none;')
        node.classList.add('hit')
      } else if (renderHit(board.missedShots,[i,j]))
        {
        node.classList.add('miss')
        node.setAttribute('style','pointer-events: none;')
      } else if (Object.getPrototypeOf(grid[i][j]) === Battleship.prototype && container.id == 'player-1') {
        node.classList.add('ship')
      } else {
        node.classList.add('water')
      }
      k+=1
    }
  }
}

function renderHit(arr,coord){
  for (const arrCoord of arr) {
    if (arrCoord.every((val,i) => val == coord[i]) ) {
      return true
    }
  }
  return false
}

function createBoard(container){
  let i = 0
  let j = 0
  while (i < 10){
    while (j < 10){
      const rowCell = document.createElement('div')
      rowCell.setAttribute('coord', `${i} ${j}`)
      rowCell.classList.add('cell')
      container.append(rowCell)
      j+=1
    }
    j = 0
    i+=1
  }
}



export {renderBoard, createBoard};