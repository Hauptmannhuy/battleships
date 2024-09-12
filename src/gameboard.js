import Battleship from "./battleship"

class Gameboard {
  constructor() {
    this.grid = this.makeGrid()
    this.missedShots = []
    this.hitShots = []
    this.ships = []
  }


  makeGrid(){
    const arr = []
    for(let y = 0; y < 10; y++ ){
      arr.push([])
      for (let x = 0; x < 10; x++) {
        arr[y].push([])
      }
    }
    return arr;
  }

   shipRemains(){
   const remains = {1:0, 2:0, 3:0, 4:0}
   this.ships.forEach((ship)=> {
    if (!ship.sunk){
      remains[ship.length]+=1
    }
   })
   return remains
  }

  placeShip(start, end, ship){
   let [y, x] = start
   let [dy, dx] = end
   for (let i = x; i <= dx; i++) {
    this.grid[y][i] = ship
   }
   for (let i = y; i <= dy; i++) {
    this.grid[i][x] = ship
   }
   this.ships.push(ship)
  }

  receiveStrike(coords){
   let [y,x] = coords
    if (Object.getPrototypeOf(this.grid[y][x]) === Battleship.prototype){
      this.grid[y][x].hit();
      this.hitShots.push([y,x])
      return 'Ship got hit!'
    }else {
      this.missedShots.push([y,x])
      return 'Missed!'
    }
  }

  playerLost(){
    for (let i = 0; i < this.ships.length; i++) {
      const ship = this.ships[i];
      if (ship.sunk == false){
        return false;
      }
    }
    return true;
  }

  randomPlace(){
    let usedCoords = []
    let shipsLength = [4,3,3,2,2,1,1]
    for (let i = 0; i < shipsLength.length; i++) {
      const n = shipsLength[i];
      let coords = this.randomCoords(n,usedCoords)
      let start = coords[0]
      let end = coords[1]
      let ship = new Battleship(n)
      usedCoords.push([start,end])
      this.placeShip(start,end,ship)
    }
  }

  overlap(start,end,coords){
    let [y1,x1] = start
    let [y2,x2] = end
    for (let i = 0; i < coords.length; i++) {
      let [dy1,dx1] = coords[i][0] // start of existing coordinates
      let [dy2,dx2] = coords[i][1] // end of existing coordinates
      const overlapY = Math.max(y1,dy1) <= Math.min(dy2,y2)
      const overlapX = Math.max(x1,dx1) <= Math.min(dx2,x2)
      if (overlapX && overlapY){
        return true
      }
    }
    return false;
  }

  randomCoords(length,usedCoords){
  let start = [ Math.floor(Math.random()*10),Math.floor(Math.random()*10)]
  let end = [ start[0],start[1]+length]
  if ( this.overlap(start,end, usedCoords) || end[1] > 9){
   return this.randomCoords(length, usedCoords)
  } else {
    return [start,end]
  }

  }

}


export default Gameboard