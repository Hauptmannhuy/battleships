class Gameboard {
  constructor() {
    this.grid = this.makeGrid()
    this.missedShots = []
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
    if (typeof this.grid[y][x] != 'object'){
      this.grid[y][x].hit();
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

  
}


export default Gameboard