import Battleship from "../src/battleship"


it('battleship got > 2 HP and gets hit and hp decreases by one', () => {
  const ship = new Battleship(3)
  const initialHitPoints = ship.hitPoints
  expect(ship.hit()).toBe(initialHitPoints-1)
})

it('battleship got HP == 1 and gets hit resulting by sunk',() => {
  const ship = new Battleship(1)
  expect(ship.hit()).toBe(0)
  expect(ship.sunk).toBe(true)
})