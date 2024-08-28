import Battleship from "./battleship";
import Gameboard from "./gameboard";
import Player from "./player";
import { renderBoard } from "./renderBoard";
import './assets/board.css' 
const quickPlayBtn = document.getElementById('quick-play')

let moveOrder = false

const player1Board = document.getElementById('player-1')
const player2Board = document.getElementById('player-2')



const cacheStrikeEvent = (board, innerBoard) => {
  let battleships = board.childNodes
  for (let i = 0; i < 100; i++) {
    const ship = battleships[i]
    ship.addEventListener('click',(e) => {
          if ((moveOrder == false && e.target.parentNode.id == 'player-1') || (moveOrder == true && e.target.parentNode.id == 'player-2') ) {
            return;
          } else {
            let coord = e.target.getAttribute('coord').split(' ').map((n) => n*1)
            console.log(innerBoard.receiveStrike(coord))
            moveOrder = moveOrder == moveOrder
          }
        })
  }
}

const cacheComputerStrikeEvent = (computerBoard, playerBoard, playerInnerBoard) => {
  let computerShips = computerBoard.childNodes
  computerShips.forEach(ship => {
    ship.addEventListener('click',(e)=>{
     console.log('ai event strike')

    })
  });
}


function quickPlay() {
  let player = new Player
  let computer = new Player
  player.board.randomPlace()
  computer.board.randomPlace()
  renderBoard(player.board.grid,player1Board)
  renderBoard(computer.board.grid,player2Board)
  cacheStrikeEvent(player2Board,computer.board)
  cacheComputerStrikeEvent(player2Board,player1Board, player.board)
}

quickPlay()
