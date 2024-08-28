import Battleship from "./battleship";
import Gameboard from "./gameboard";
import Player from "./player";
import { renderBoard, cacheStrikeEvent } from "./renderBoard";
import './assets/board.css' 
const quickPlayBtn = document.getElementById('quick-play')

let moveOrder = false

const player1Board = document.getElementById('player-1')
const player2Board = document.getElementById('player-2')



function quickPlay() {
  let player = new Player
  let computer = new Player
  player.board.randomPlace()
  computer.board.randomPlace()
  renderBoard(player.board.grid,player1Board)
  renderBoard(computer.board.grid,player2Board)
  cacheStrikeEvent(player2Board,computer.board)

  while (!player.board.playerLost && !computer.board.playerLost) { 
  
}
}

quickPlay()
