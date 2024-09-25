class Battleship {
  constructor(length) {
    this.length = length;
    this.hitPoints = length;
    this.sunk = false;
  }

  hit() {
    this.hitPoints -= 1;
    if (this.hitPoints == 0) {
      this.isSunk();
      return 0;
    }
    return this.hitPoints;
  }

  isSunk() {
    return (this.sunk = true);
  }
}

export default Battleship;
