import Battleship from "./battleship";
import Gameboard from "./gameboard";
import Player from "./player";
import { renderBoard, createBoard, gameOverDeclaration } from "./renderBoard";
import { gamestate, playerStrike, computerStrike,gameOver } from './gameFLow'
import './assets/board.css'

const quickPlayBtn = document.getElementById('quick-play')



const player1Board = document.getElementById('player-1')
const player2Board = document.getElementById('player-2')




const cacheStrikeEvent = (board, innerBoard) => {
  let battleships = board.childNodes
  for (let i = 0; i < 100; i++) {
    const ship = battleships[i]
    ship.addEventListener('click',(e) => {
          if ((gamestate['moveOrder'] == false && e.target.parentNode.id == 'player-1') || (gamestate['moveOrder'] == true && e.target.parentNode.id == 'player-2') ) {
            return;
          } else {
            playerStrike(e.target,innerBoard)
            renderBoard(innerBoard,player2Board)
            if (gameOver(innerBoard)){
              gameOverDeclaration()
            }
          }
        })
  }
}

const cacheComputerStrikeEvent = (computerBoard, playerBoard, playerInnerBoard) => {
  let computerShips = computerBoard.childNodes
  computerShips.forEach(ship => {
    ship.addEventListener('click',(e)=>{
      computerStrike(playerInnerBoard)
      renderBoard(playerInnerBoard,playerBoard)
    })
  });
}


function quickPlay() {
  createBoard(player1Board)
  createBoard(player2Board)
  gamestate['player1'] = new Player
  gamestate['player2'] = new Player
  gamestate['player1'].board.randomPlace()
  gamestate['player2'].board.randomPlace()
  renderBoard(gamestate['player1'].board,player1Board)
  renderBoard(gamestate['player2'].board,player2Board)
  cacheStrikeEvent(player2Board,gamestate['player2'].board)
  cacheComputerStrikeEvent(player2Board,player1Board, gamestate['player1'].board)
}

quickPlay()
