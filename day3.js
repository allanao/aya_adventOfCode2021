const { AocClient } = require('advent-of-code-client');

const client = new AocClient({
  year: 2021,
  day: 3,
  token: '53616c7465645f5f4c30002c5f646d308113daac93f985778abe68d910229a83618802023091b729f5635a3b24d2b2a5'
})

let input = client.getInput()
  .then(data => {
    // use split method to put each piece of data into an array
    const binaries = data.split("\n");
    console.log(binaries.length); // 1000
    console.log(binaries[0].length);
    // console.log('INPUT DATA:', binaries); // array of strings
    // console.log('ANSWER:', binaryDiagnostic(binaries)); // Part 1 Answer: 2743844
    console.log('PART 2 - ANSWER:', binaryDiagnostic2(binaries)); // Part 2 Answer: 6677951
    // return levels;
  })
  .catch(err => console.log(err))


// NOTES:
// variables needed: power consumption, binary numbers --> (gamma rate * epsilon rate)
// gamma rate - most common bit in the corresponding position
// epsilon rate - least common bit from each position
// binary to decimal number computation - 2^4 (left most number)

// INPUT: diagnostic report (array of strings)
// OUTPUT: power consumption (in decimal; gamma rate * epsilon rate)
// Aya's solution - 12/12/21 - Part 1 solved
function binaryDiagnostic(diagnosticReport) {
  const frequencies =  {};
  // calculate for gammaRate
  const mostCommonBits = [];
  const leastCommonBits = [];
  // const leastCommonBits = [];
  // iterate through diagnosticReport
  for (const binary of diagnosticReport) {
  // for each binary number, at each index position, we need to check for ones
  // iterate through binary string
    for (let i = 0; i < binary.length; i++) {
      if (!frequencies[i]) frequencies[i] = [0, 0]; // save index position as key
      if (binary[i] === '0') frequencies[i][0]++;
      if (binary[i] === '1') frequencies[i][1]++;
    }
  }
  // iterate through frequencies object
  for (const index in frequencies) {
    const value = frequencies[index];

    if (value[0] > value[1]) {
      mostCommonBits.push(0);
      leastCommonBits.push(1);
    } else {
      mostCommonBits.push(1);
      leastCommonBits.push(0);
    }
  }
  const gammaRateBin = mostCommonBits.join('');
  const epsilonRateBin = leastCommonBits.join('');

  let gammaRate = 0, epsilonRate = 0;
  let exponent = gammaRateBin.length - 1;
  // convert gamma rate and epsilon rate binaries to decimal
  for (let i = 0; i < gammaRateBin.length; i++) {
    const bit = Number(gammaRateBin[i]);
    
    if (bit === 1) gammaRate += Math.pow(2, exponent);
    exponent--;
  }

  exponent = epsilonRateBin.length - 1;

  for (let i = 0; i < epsilonRateBin.length; i++) {
    const bit = Number(epilonRateBin[i]);
    
    if (bit === 1) epsilonRate += Math.pow(2, exponent);
    exponent--;
  }

  // multiply converted values and return value
  return gammaRate * epsilonRate;
};

// Part 2:
// additional variable needed: life support rating -- oxygen generator rating * CO2 scrubber rating
// oxygen generator rating - filtering with the most common position in each bit
// CO2 scrubber rating - filtering with the least common position in each bit

function binaryDiagnostic2(diagnosticReport) {
  const oxygenGeneratorRating = parseInt(getOGR(diagnosticReport), 2);
  const co2ScrubberRating = parseInt(getCSR(diagnosticReport), 2);

  return [oxygenGeneratorRating, co2ScrubberRating, oxygenGeneratorRating * co2ScrubberRating];
}

const getOGR = (arr) => {
  let result = arr.slice();  

  // variables for iteration
  let length = arr[0].length;
  let i = 0;

  while (i < length) {
    const count = countFrequency(result, i);
    const [zeroes, ones] = count;

    // evaluates how to filter current array
    if (zeroes > ones) result = filterMax(result, i, '0');
    else result = filterMax(result, i, '1');

    i++;
  }
  return result[0];
}

const getCSR = (arr) => {
  let result = arr.slice();

  let length = arr[0].length;
  let i = 0;

  while (i < length) {
    const count = countFrequency(result, i);
    const [zeroes, ones] = count;

    if (zeroes > ones) result = filterMax(result, i, '1');
    else result = filterMax(result, i, '0');

    i++;
  }
  return result[0];
}

// determines frequencies in a given array
const countFrequency = (arr, idx) => {
  const frequencies = {0: 0, 1: 0};
  for (const binary of arr) {

    if (binary[idx] === '0') frequencies[0]++;
    if (binary[idx] === '1') frequencies[1]++;
  }
  return Object.values(frequencies);
}

// filters array
const filterMax = (arr, idx, target) => {
  if (arr.length === 1) return arr;
  
  const filtered = arr.filter(bin => bin[idx] === target);
  return filtered;
};



// FOR REFACTORING: Using a helper function;
// function convertBinToDec(binary, rate, exponent) {
//   for (let i = 0; i < binary.length; i++) {
//     const bit = Number(binary[i]);
    
//     if (bit === 1) rate += Math.pow(2, exponent);
//     exponent--;
//   }
// }

const example1 = ['00100',
'11110',
'10110',
'10111',
'10101',
'01111',
'00111',
'11100',
'10000',
'11001',
'00010',
'01010'];
console.log(example1.length);
console.log('example answer:', binaryDiagnostic2(example1)); // 198 (extension: 230)
