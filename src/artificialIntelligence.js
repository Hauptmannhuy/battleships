// import Gameboard from "./gameboard"

function computerStrike(board) {
  console.log(board.receiveStrike(getRandomCoord()))
}

function getRandomCoord(){
  return [ Math.floor(Math.random()*10),Math.floor(Math.random()*10)]

}

export { computerStrike }