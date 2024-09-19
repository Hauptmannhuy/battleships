import Battleship from "./battleship"

const gamestate = { moveOrder: false,
 player1: null,
 player2: null,
}

function playerStrike(target, innerBoard){
  let coord = target.getAttribute('coord').split(' ').map((n) => n*1)
  console.log('player fire')
  console.log(innerBoard.receiveStrike(coord))
  gamestate['moveOrder'] = true
}

function computerStrike(board) {
  console.log('computer fire')

  console.log(board.receiveStrike(getRandomCoord(board.missedShots.concat(board.hitShots))))
  gamestate['moveOrder'] = false
}

function getRandomCoord(checkedCoords){
  let random = [ Math.floor(Math.random()*10),Math.floor(Math.random()*10)]
  let iterationContinue = true
  while (iterationContinue) {
    let duplicateFound = false
    for (const coord of checkedCoords) {
      if (coord.every((val,i) => val == random[i])){
        random = [ Math.floor(Math.random()*10),Math.floor(Math.random()*10)]
        duplicateFound = true
        break
      }
    }
    if (!duplicateFound) {
     iterationContinue = false 
    }
  }
  return random
}

function gameOver(board){
  if (board.playerLost()){
    return true
  } else {
    return false
  }
}


export {gamestate, playerStrike, computerStrike, gameOver}