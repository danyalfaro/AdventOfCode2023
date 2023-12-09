const fs = require("node:fs");
const input = fs.readFileSync("1/input.txt", "utf8");

const part1Result = input
  .split(/\n/)
  .map((code) => {
    let first;
    let last;
    for (let char of code) {
      if (!first && char.match(`[0-9]`)) (first = char), (last = char);
      else if (char.match(`[0-9]`)) last = char;
    }
    return parseInt(`${first}${last}`);
  })
  .reduce((prev, curr) => {
    return prev + curr;
  });

const writtenNumberToDigitMap = {
  one$: "1",
  two$: "2",
  three$: "3",
  four$: "4",
  five$: "5",
  six$: "6",
  seven$: "7",
  eight$: "8",
  nine$: "9",
};

const partTwoResult = input
  .split(/\n/)
  .map((code) => {
    let first;
    let last;
    for (let i = 0; i < code.length; i++) {
      if (code[i].match(`[0-9]`)) {
        if (!first) (first = code[i]), (last = code[i]);
        else last = code[i];
      } else {
        Object.keys(writtenNumberToDigitMap).forEach((digit) => {
          if (code.slice(0, i + 1).match(`${digit}`)) {
            if (!first) {
              first = writtenNumberToDigitMap[digit];
              last = writtenNumberToDigitMap[digit];
            } else last = writtenNumberToDigitMap[digit];
          }
        });
      }
    }
    return parseInt(`${first}${last}`);
  })
  .reduce((prev, curr) => {
    return prev + curr;
  });

console.log(part1Result);
console.log(partTwoResult);
