import Battleship from "./battleship";
import Player from "./player";
import {
  renderBoard,
  createBoard,
  gameOverDeclaration,
  displaySelector,
  removeHighlights,
} from "./renderBoard";
import { gamestate, playerStrike, computerStrike, gameOver } from "./gameFLow";
import "./assets/board.css";
import "./assets/menu.css";

const player1Board = document.getElementById("player-1");
const player2Board = document.getElementById("player-2");
const player1BoardContainer = document.getElementById("player-1-container");
const player2BoardContainer = document.getElementById("player-2-container");
const quickPlayBtn = document.getElementById("quick-play");
const newGameBtn = document.getElementById("new-game");
const startMenu = document.querySelector(".start-menu-container");
const gameContainer = document.querySelector(".game-container");

const cacheStrikeEvent = (board, innerBoard) => {
  let battleships = board.childNodes;
  for (let i = 0; i < 100; i++) {
    const ship = battleships[i];
    ship.addEventListener("click", (e) => {
      if (
        (gamestate["moveOrder"] == false &&
          e.target.parentNode.id == "player-1") ||
        (gamestate["moveOrder"] == true && e.target.parentNode.id == "player-2")
      ) {
        return;
      } else {
        playerStrike(e.target, innerBoard);
        renderBoard(innerBoard, player2Board);
        if (gameOver(innerBoard)) {
          gameOverDeclaration();
        }
      }
    });
  }
};

const cacheComputerStrikeEvent = (
  computerBoard,
  playerBoard,
  playerInnerBoard,
) => {
  let computerShips = computerBoard.childNodes;
  computerShips.forEach((ship) => {
    ship.addEventListener("click", (e) => {
      computerStrike(playerInnerBoard);
      renderBoard(playerInnerBoard, playerBoard);
    });
  });
};

function cacheDraggableShips() {
  const draggableShips = document.querySelectorAll(".ship-display-container");
  draggableShips.forEach((ship) => {
    ship.addEventListener("mousedown", function onMouseDown() {
      let lastElement = null;
      let selectedCoords = [];
      let dropable = false;
      let elementUnderShip = null;
      const initialX = ship.style.left;
      const initialY = ship.style.top;
      ship.style.position = "absolute";
      function moveAt(pageX, pageY) {
        ship.style.left = pageX - ship.offsetWidth / 2 + "px";
        ship.style.top = pageY - ship.offsetHeight / 2 + "px";
      }
      function onMouseMove(ev) {
        moveAt(ev.pageX, ev.pageY);
        ship.style.display = "none";
        elementUnderShip = document.elementFromPoint(ev.pageX, ev.pageY);
        if (elementUnderShip.hasAttribute("coord")) {
          let coords = elementUnderShip.getAttribute("coord").split(" ");
          let shipLength = ship.children.length;
          if (lastElement != elementUnderShip) {
            let unprocessedCoords = [];
            selectedCoords = removeHighlights(selectedCoords);

            for (let i = 0; i < shipLength; i++) {
              let incrementedCoordinate = `[coord = "${Number(coords[0])} ${Number(coords[1]) + i}"]`;
              try {
                let cell = document.querySelector(incrementedCoordinate);
                unprocessedCoords.push(cell);
              } catch (error) {
                console.error("Error occurred:", error.message);
                dropable = false;
                return;
              }
            }
            if (
              unprocessedCoords.every(
                (el) => !el.classList.contains("highlight"),
              )
            ) {
              // check for overlap
              unprocessedCoords.forEach((el) => el.classList.add("highlight"));
              lastElement = elementUnderShip;
              dropable = true;
            } else {
              dropable = false;
              unprocessedCoords = [];
            }
            selectedCoords = unprocessedCoords;
          }
        } else {
          dropable = false;
          ship.style.display = "grid";
        }
      }
      document.addEventListener("mousemove", onMouseMove);

      document.addEventListener("mouseup", function onMouseUp() {
        if (dropable) {
          selectedCoords = selectedCoords.map((domEl) =>
            domEl.getAttribute("coord").split(" "),
          );
          const newShip = new Battleship(ship.length);
          const startCoord = selectedCoords.shift().map((el) => Number(el));
          const endCoord =
            selectedCoords.length > 0
              ? selectedCoords.pop().map((el) => Number(el))
              : startCoord;
          gamestate["player1"].board.placeShip(startCoord, endCoord, newShip);
          ship.removeEventListener("mousedown", onMouseDown);
          ship.remove();
        } else {
          ship.style.display = "grid";
          ship.style.position = "relative";
          ship.style.left = initialX;
          ship.style.top = initialY;
        }

        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      });
    });
  });
}

function cacheGameStartBtn() {
  const startBtn = document.querySelector(".finish-ship-placement");
  startBtn.addEventListener("click", function finishGameInitialize() {
    if (document.querySelectorAll(".ship-display-container").length == 0) {
      document.querySelector(".ship-selector").classList.add("hidden");
      removeHighlights(document.querySelectorAll(".highlight"));
      document.getElementById("player-2-container").classList.remove("hidden");
      renderBoard(gamestate["player1"].board, player1Board);
      gamestate["player2"].board.randomPlace();
      renderBoard(gamestate["player2"].board, player2Board);
      cacheStrikeEvent(player2Board, gamestate["player2"].board);
      cacheComputerStrikeEvent(
        player2Board,
        player1Board,
        gamestate["player1"].board,
      );
    } else {
      prompt("Place remain ships to continue");
    }
  });
}

function quickPlay() {
  createBoard(player1Board);
  createBoard(player2Board);
  gamestate["player1"] = new Player();
  gamestate["player2"] = new Player();
  gamestate["player1"].board.randomPlace();
  gamestate["player2"].board.randomPlace();
  renderBoard(gamestate["player1"].board, player1Board);
  renderBoard(gamestate["player2"].board, player2Board);
  cacheStrikeEvent(player2Board, gamestate["player2"].board);
  cacheComputerStrikeEvent(
    player2Board,
    player1Board,
    gamestate["player1"].board,
  );
}

function newGame() {
  createBoard(player1Board);
  createBoard(player2Board);
  player2BoardContainer.classList.add("hidden");
  gamestate["player1"] = new Player();
  gamestate["player2"] = new Player();
  displaySelector(player1BoardContainer, player1Board, gamestate["player1"]);
  cacheDraggableShips();
  cacheGameStartBtn();
}

quickPlayBtn.addEventListener("click", (event) => {
  startMenu.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  quickPlay();
});

newGameBtn.addEventListener("click", () => {
  startMenu.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  newGame();
});
