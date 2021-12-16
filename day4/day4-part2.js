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
// console.log('cards', cards); // array of arrays

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
    this.markedNums = new Set();
  }


  addMarkedNum(num) {
    this.markedNums.add(num);

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

  unmarkedNumbers(){
    return this.numbers.filter((n) => !this.markedNums.has(n));
  }

  showCard() {
    const array = [];
    for (let i = 0; i < this.cardSize; i++) {
      array.push(
        this.numbers
          .slice(i * this.cardSize, i * this.cardSize + this.cardSize)
          .join('\t')
      )
    }
    console.log('showMap', array.join('\n') + "\n");
  }
}


// initialize each card
cards = cards.map(board => new Card(board));

let lastWinningCard;
let lastBingoNum;
let readDrawnNums = [];
let winnerCards = 0;
// for each number drawn, mark number in the board
for (const num of drawnNums) { 
  // let incompleteCards = false;
  readDrawnNums.push(num);

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    
    // only check if its a winning card, if isComplete flag is false
    if (!card.isComplete) {
      // incompleteCards = true;
      card.addMarkedNum(num);
      if (card.isComplete) {
        winnerCards++;
        lastWinningCard = card;
        lastBingoNum = num;
      }
    }

  }

  if (winnerCards === cards.length) {
      break;
  }
}
const unmarkedNums = lastWinningCard.unmarkedNumbers();
const unmarkedNumsSum = unmarkedNums.reduce((prev, curr) => prev + curr);

console.log('unmarkedNumsSum', unmarkedNumsSum, lastBingoNum);
console.log('ANSWER:', unmarkedNumsSum * lastBingoNum); // 16830

// DEBUGGING LOGS:
// console.log('unmarkedNums', unmarkedNums);
// console.log('readDrawn', readDrawnNums);
// console.log('lastWinningCard', lastWinningCard);
