import Battleship from "./battleship";
import Gameboard from "./gameboard";
import Player from "./player";
import { renderBoard } from "./renderBoard";
import './assets/board.css' 
const quickPlayBtn = document.getElementById('quick-play')

let moveOrder = false

const player1Board = document.getElementById('player-1')
const player2Board = document.getElementById('player-2')

const cacheBattleshipsEvents = (board) => {
  console.log(board)
  const battleships = board.children
  console.log(battleships)
  // battleships.forEach(ship => {
  //   ship.addEventListener('click',(e) => {
  //     if (moveOrder == false && e.target.parent.id == 'player-1' ) {
  //       return;
  //     } else {
  //       let coord = target.coord.split(' ').map((n) => n*1)
  //       console.log(board.receiveStrike(coord))
  //     }
  //   })
  // });
}


function quickPlay() {
  let player = new Player
  let computer = new Player
  player.board.randomPlace()
  computer.board.randomPlace()
  renderBoard(player.board.grid,player1Board)
  renderBoard(computer.board.grid,player2Board)
  // while (!player.board.playerLost || !computer.board.playerLost) {
    
  // }
  
}

console.log(player1Board.children)

cacheBattleshipsEvents(player2Board)

quickPlay()