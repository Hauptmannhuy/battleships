import Battleship from "../src/battleship";
import Gameboard from "../src/gameboard";

let gameboard = new Gameboard();
let ship = new Battleship(2);

beforeEach(() => {
  gameboard = new Gameboard();
  ship = new Battleship(2);
});

it("places ship horizontal within specified x,y coordinates", () => {
  gameboard.placeShip([0, 0], [0, 1], ship);
  expect(gameboard.grid[0][0]).toBe(ship);
  expect(gameboard.grid[0][1]).toBe(ship);
});

it("places ship vertically within x,y coordinates", () => {
  gameboard.placeShip([0, 0], [1, 0], ship);
  expect(gameboard.grid[0][0]).toBe(ship);
  expect(gameboard.grid[1][0]).toBe(ship);
});

it("receives attack on specified coordinates and report status", () => {
  gameboard.placeShip([4, 4], [4, 5], ship);
  expect(gameboard.receiveStrike([4, 5])).toBe("Ship got hit!");
  expect(gameboard.receiveStrike([4, 1])).toBe("Missed!");
});

it("playerLost returns true if player lost all his ships", () => {
  gameboard.placeShip([4, 4], [4, 5], ship);
  gameboard.receiveStrike([4, 4]);
  gameboard.receiveStrike([4, 5]);
  expect(gameboard.playerLost()).toBe(true);
});

it("playerLost returns false if player have alive ships", () => {
  gameboard.placeShip([4, 4], [4, 5], ship);
  gameboard.receiveStrike([4, 5]);
  expect(gameboard.playerLost()).toBe(false);
});

describe("Gameboard randomPlace function", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  it("places all ships in valid coordinates", () => {
    jest
      .spyOn(gameboard, "randomCoords")
      .mockImplementation((length, usedCoords) => {
        if (length === 4)
          return [
            [0, 0],
            [0, 3],
          ];
        if (length === 3)
          return [
            [1, 0],
            [1, 2],
          ];
        if (length === 2)
          return [
            [2, 0],
            [2, 1],
          ];
        if (length === 1)
          return [
            [3, 0],
            [3, 0],
          ];
        return [
          [0, 0],
          [0, 0],
        ];
      });

    gameboard.randomPlace();

    expect(gameboard.grid[0][0]).toBeInstanceOf(Battleship);
    expect(gameboard.grid[0][1]).toBeInstanceOf(Battleship);
    expect(gameboard.grid[0][2]).toBeInstanceOf(Battleship);
    expect(gameboard.grid[0][3]).toBeInstanceOf(Battleship);

    expect(gameboard.grid[1][0]).toBeInstanceOf(Battleship);
    expect(gameboard.grid[1][1]).toBeInstanceOf(Battleship);
    expect(gameboard.grid[1][2]).toBeInstanceOf(Battleship);

    expect(gameboard.grid[2][0]).toBeInstanceOf(Battleship);
    expect(gameboard.grid[2][1]).toBeInstanceOf(Battleship);

    expect(gameboard.grid[3][0]).toBeInstanceOf(Battleship);

    expect(gameboard.grid[1][3]).toBeInstanceOf(Array);
    expect(gameboard.grid[1][4]).toBeInstanceOf(Array);
  });
});
