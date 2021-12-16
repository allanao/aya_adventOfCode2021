const fs = require("fs");
const path = require("path");

// input cleaning
const lines = fs
  .readFileSync(path.resolve(__dirname, "day4-input.txt"), { encoding: "utf-8" })
  .split("\n\n")
  .filter(x => Boolean(x))
  .map((x) => 
    x
    .replace(/[\n ,]+/g, " ")
    .trim()
    .split(" ")
    .map(y => parseInt(y))
  )

let [ drawnNums, ...cards ] = lines;
// console.log(numbers); // array of numbers
console.log(cards); // array of arrays

class Card { 
  constructor(nums) {
    this.numbers = nums; // array of numbers
    this.cardSize = 5;
    
    // counts which values are marked
    this.rows = Array(this.cardSize).fill(null);
    this.cols = Array(this.cardSize).fill(null);

    // initializes number positions
    this.numberPosition = new Map();
    for (let i = 0; i < this.numbers.length; i++) {
      const n = this.numbers[i];
      this.numberPosition.set(n, {
        line: Math.floor(i / this.cardSize),
        column: i % this.cardSize
      })
    }

    this.isComplete = false;
  }


  addMarkedNum(num) {
    const position = this.numberPosition.get(num);
    if (!position) {
      return;
    }
    this.rows[position.line]++;
    this.cols[position.column]++;
    // every time you mark a number, check if its complete
    if (this.rows[position.line] === this.cardSize || this.cols[position.column] === this.cardSize) {
      this.isComplete = true;
    }
    
  }

  showMap() {
    for (const i of this.numberPosition) {
      console.log(i, this.numberPosition.get(i));
    }
  }
}

// initialize each card
cards = cards.map(board => new Card(board));

let winningCard;
let bingoNum;
let readDrawnNums = [];
// for each number drawn, mark number in the board
for (const num of drawnNums) {
  let bingo = false;
  readDrawnNums.push(num);
  for (const card of cards) {
    card.addMarkedNum(num);
    if (card.isComplete) {
      bingo = true;
      winningCard = card;
      break;
    }
  }
  if (bingo) {
    bingoNum = num;
    break;
  }
}

const unmarkedNums = winningCard.numbers.filter(n => !readDrawnNums.includes(n));
const unmarkedNumsSum = unmarkedNums.reduce((prev, curr) => prev + curr);
console.log('unmarkedNums', unmarkedNums);
console.log('unmarkedNumsSum', unmarkedNumsSum, bingoNum);

console.log('ANSWER:', unmarkedNumsSum * bingoNum);
// console.log('winningCard', winningCard);
// console.log('showmap', cards[0].showMap());