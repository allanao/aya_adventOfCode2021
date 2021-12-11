const { AocClient } = require('advent-of-code-client');

const client = new AocClient({
  year: 2021,
  day: 2,
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


// NOTES:
// hp, depth (integers)
// forward - increases hp
// down - increases depth
// up - decreases depth 

// INPUT: 
// OUTPUT: hp * depth 
// Aya's solution - 
function dive(plannedCourse) {

};

// const example1 = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
// console.log(example1.length);
// console.log('example answer:', dive(example1)); // 7 (extension: 5)