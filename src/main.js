import Battleship from "./battleship";
import Gameboard from "./gameboard";
import Player from "./player";
import { renderBoard, createBoard } from "./renderBoard";
import { computerStrike } from './artificialIntelligence'
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
            moveOrder = true
            renderBoard(innerBoard,player2Board)
          }
        })
  }
}

const cacheComputerStrikeEvent = (computerBoard, playerBoard, playerInnerBoard) => {
  let computerShips = computerBoard.childNodes
  computerShips.forEach(ship => {
    ship.addEventListener('click',(e)=>{
      computerStrike(playerInnerBoard)
      moveOrder = false
      renderBoard(playerInnerBoard,playerBoard)
    })
  });
}


function quickPlay() {
  createBoard(player1Board)
  createBoard(player2Board)
 let player1 = new Player
 let player2 = new Player
  player1.board.randomPlace()
  player2.board.randomPlace()
  renderBoard(player1.board,player1Board)
  renderBoard(player2.board,player2Board)
  cacheStrikeEvent(player2Board,player2.board)
  cacheComputerStrikeEvent(player2Board,player1Board, player1.board)
}

quickPlay()
