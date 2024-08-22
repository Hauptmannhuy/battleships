import Battleship from "../src/battleship";
import Gameboard from "../src/gameboard";

const gameboard = new Gameboard
const ship = new Battleship(2)

it('places ship horizontal within specified x,y coordinates', () => {
  gameboard.placeShip([0,0], [0,2], ship)
  expect(gameboard.grid[0][0]).toBe(ship)
  expect(gameboard.grid[0][1]).toBe(ship)
  expect(gameboard.grid[0][2]).toBe(ship)
})

it('places ship vertically within x,y coordinates', () => {

  gameboard.placeShip([0,0], [2,0], ship)
  expect(gameboard.grid[0][0]).toBe(ship)
  expect(gameboard.grid[1][0]).toBe(ship)
  expect(gameboard.grid[2][0]).toBe(ship)
})

it ('receives attack on specified coordinates and report status', () => {
  const gameboard = new Gameboard
  gameboard.placeShip([4,4], [4,5], ship)
  expect(gameboard.receiveStrike([4,5])).toBe('Ship got hit!')
  expect(gameboard.receiveStrike([4,1])).toBe('Missed!')
})