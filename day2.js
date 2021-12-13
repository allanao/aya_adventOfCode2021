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
    console.log('ANSWER:', dive(directions)); // Part 1 Answer: 2117664, Part 2: 2073416724
    // return levels;
  })
  .catch(err => console.log(err))


// NOTES:
// variables needed: hp, depth (integers)
// forward - increases hp
// down - increases depth
// up - decreases depth 

// Part 2:
// additional variable needed: aim (init to 0)
// down - increases aim
// up - decreases aim
// forward - increases hP by x units AND increases depth by aim's current value * X


// INPUT: array of strings 'direction number
// OUTPUT: hp * depth 
// Aya's solution - 12/10/21 - Part 1 solved
function dive(plannedCourse) {
  // initialize horizontalPosition and depth variables
  let hp = 0, depth = 0, aim = 0;
  // iterate through input array
  for (const command of plannedCourse) {
    // split each string into an array, use array destructuring to get values [direction, value]
    const [ direction, value ] = command.split(' ');
    
    if (direction === 'down') aim += Number(value);
    if (direction === 'up') aim -= Number(value);
    if (direction === 'forward') {
      hp += Number(value);
      depth += (Number(value) * aim);
    } 
  }
  return hp * depth;
};

const example1 = ['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2'];
console.log(example1.length);
console.log('example answer:', dive(example1)); // 150 (extension: 900)
