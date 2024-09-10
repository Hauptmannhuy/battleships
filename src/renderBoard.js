import Battleship from "./battleship";

function renderBoard(board, container){
  const boardNodes = container.children
  const grid = board.grid
  let k = 0
  for (let i = 0; i < grid.length; i++) {
    const col = grid[i];


    for (let j = 0; j < col.length; j++) {
      const node = boardNodes[k]
      if (renderShot(board.hitShots,[i,j])) {
        node.innerHTML = 'HIT'
      } else if (renderShot(board.missedShots,[i,j]))
        {
        node.innerHTML = 'MISS'
      } else if (Object.getPrototypeOf(grid[i][j]) === Battleship.prototype) {
        node.innerHTML = `ship [${[i]},${j}]`
      } else {
        node.innerHTML = `[${[i]},${j}]`
      }
      k+=1
    }
  }
}

function renderShot(arr,coord){
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