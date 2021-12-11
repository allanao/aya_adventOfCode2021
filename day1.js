const { AocClient } = require('advent-of-code-client');


// https://adventofcode.com/2021/day/1/input

const client = new AocClient({
  year: 2021,
  day: 1,
  token: '53616c7465645f5f4c30002c5f646d308113daac93f985778abe68d910229a83618802023091b729f5635a3b24d2b2a5'
})

let input = client.getInput()
  .then(data => {
    // use split method to put each level into an array
    const levels = data.split("\n");
    console.log(levels.length);
    console.log('ANSWER:', sonarSweep(levels));
    // return levels;
  })
  .catch(err => console.log(err))



// async function fetchInput() {
//   return await client.getInput();
// }
// const input = fetchInput();
// console.log(typeof input);

console.log('before func:', input);


// INPUT: string
// Output: integer (number of times a depth measurement increases)
// Aya's solution -  12/10/12 - Extension solved
function sonarSweep(arr) {
  let largerCount = 0;
  let prevSum = 0;
  // iterate through input string
  for (let i = 0; i < arr.length - 2; i++) {
    let currSum = Number(arr[i]) + Number(arr[i+1]) + Number(arr[i+2]);
    if (currSum > prevSum) largerCount++;
    prevSum = currSum;
  }
  return largerCount - 1;
};

const example1 = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
console.log(example1.length);
console.log('example answer:', sonarSweep(example1)); // 7 (extension: 5)