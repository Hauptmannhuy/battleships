class Gameboard {
  constructor() {
    this.grid = this.makeGrid()

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
  }
  
  ferchCoordinates(start,end){
    let x,y = start
    let processed
  }
}


export default Gameboard