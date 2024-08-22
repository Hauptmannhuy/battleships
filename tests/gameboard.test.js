import Battleship from "../src/battleship";
import Gameboard from "../src/gameboard";

it('places ship horizontal within specified x,y coordinates', () => {
  const gameboard = new Gameboard
  const ship = new Battleship
  gameboard.placeShip([0,0], [0,2], ship)
  expect(gameboard.grid[0][0]).toBe(ship)
  expect(gameboard.grid[0][1]).toBe(ship)
  expect(gameboard.grid[0][2]).toBe(ship)
})

it('places ship vertically within x,y coordinates', () => {
  const gameboard = new Gameboard
  const ship = new Battleship
  gameboard.placeShip([0,0], [2,0], ship)
  expect(gameboard.grid[0][0]).toBe(ship)
  expect(gameboard.grid[1][0]).toBe(ship)
  expect(gameboard.grid[2][0]).toBe(ship)
})