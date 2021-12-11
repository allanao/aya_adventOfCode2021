const { AocClient } = require('advent-of-code-client');

const client = new AocClient({
  year: 2021,
  day: 2,
  token: '53616c7465645f5f4c30002c5f646d308113daac93f985778abe68d910229a83618802023091b729f5635a3b24d2b2a5'
})

let input = client.getInput()
  .then(data => {
    // use split method to put each level into an array
    const directions = data.split("\n");
    // console.log(directions.length); // 1000
    // console.log('INPUT DATA:', directions); // array of strings
    console.log('ANSWER:', dive(directions));
    // return levels;
  })
  .catch(err => console.log(err))


// NOTES:
// variables needed: hp, depth (integers)
// forward - increases hp
// down - increases depth
// up - decreases depth 

// INPUT: array of strings 'direction number
// OUTPUT: hp * depth 
// Aya's solution - 12/10/21 - Part 1 solved
function dive(plannedCourse) {
  // initialize horizontalPosition and depth variables
  let hp = 0, depth = 0;
  // iterate through input array
  for (const command of plannedCourse) {
    // split each string into an array, use array destructuring to get values [direction, value]
    const [ direction, value ] = command.split(' ');
    
    if (direction === 'forward') hp += Number(value);
    if (direction === 'down') depth += Number(value);
    if (direction === 'up') depth -= Number(value);
  }
  return hp * depth;
};

const example1 = ['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2'];
console.log(example1.length);
console.log('example answer:', dive(example1)); // 150 (extension: 900)