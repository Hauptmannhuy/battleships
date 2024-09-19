import Battleship from "./battleship";

function renderBoard(board, container){
  const boardNodes = container.children
  const grid = board.grid
  let k = 0
  for (let i = 0; i < grid.length; i++) {
    const col = grid[i];


    for (let j = 0; j < col.length; j++) {
      const node = boardNodes[k]
      if (shipHit(board.hitShots,[i,j])) {
        node.setAttribute('style','pointer-events: none;')
        node.classList.add('hit')
        if (grid[i][j].sunk == true && node.children.length < 1){
          const svg = document.createElement('img')
          svg.classList.add('cross')
          svg.src = '/src/assets/img/cross.svg'
          node.append(svg)
        }
      } else if (shipHit(board.missedShots,[i,j]))
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

function shipHit(arr,coord){
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

function createShipSelector() {
  const ship = document.createElement('div')
  ship.classList.add('draggable-ship')
  return ship
}


function displaySelector(boardContainer,board, player){
  
  let shipHash = {'4':1,'3':2,'2':2,'1':3}
  const shipSelectorTemplate = `
  <h2> Ship selector </h2>
    <div class="length-4-ship">
    </div>
    <div class="length-3-ship">
    </div>
    <div class="length-2-ship">
    </div>
    <div class="length-1-ship">
  </div>
  `
  const arr = ['4','3','2','1']
  boardContainer.children[0].innerHTML = shipSelectorTemplate
  const shipSelector = document.querySelector('.ship-selector')
  for (const n of arr) {
    let table = shipSelector.querySelector(`.length-${n}-ship`)
    for (let i = 0; i < shipHash[n]; i++){
      const shipDisplayContainer = document.createElement('div')
      for (let i = 0; i < n*1; i++) {

        shipDisplayContainer.classList.add('ship-display-container')
        shipDisplayContainer.style.setProperty("grid-template-columns", `repeat(${n}, 40px)`);
        const ship = createShipSelector()
        shipDisplayContainer.append(ship)
      }
    table.append(shipDisplayContainer)
    }
  }
  const startBtn = document.createElement('button')
  startBtn.classList.add('finish-ship-placement')
  startBtn.innerHTML = 'Start'
  shipSelector.append(startBtn)
  
}

function removeHighlights(array){
  array.forEach((el) => el.classList.remove('highlight'))
  return array = []
}


function gameOverDeclaration(){
  prompt('game over!')
}


export {renderBoard, createBoard, gameOverDeclaration,  displaySelector, removeHighlights};