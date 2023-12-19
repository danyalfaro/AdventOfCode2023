const fs = require("node:fs");
const input = fs.readFileSync("4/input.txt", "utf8");
// const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const part1 = () => {
  let cardValues = [];

  input.split(/\n/).forEach((card, index) => {
    let cardMatches = 0;
    let [winningNumbers, receivedNumbers] = card.split(":")[1].split("|");
    winningNumbers = winningNumbers.split(" ");
    for (let number of receivedNumbers.matchAll(`[0-9]+`)) {
      if (winningNumbers.includes(number[0])) cardMatches += 1;
    }
    cardValues[index] = cardMatches <= 1 ? cardMatches : 2 ** (cardMatches - 1);
  });

  return cardValues.reduce((a, b) => a + b);
};

const part2 = () => {
  let matchArray = [];
  let totalCardCount = 0;

  input.split(/\n/).forEach((originalCard, index, array) => {
    if (index === 0) {
      matchArray = new Array(array.length).fill(1);
      totalCardCount += array.length;
    }
    let [winningNumbers, receivedNumbers] = originalCard
      .split(":")[1]
      .split("|");
    let cardMatches = 0;
    winningNumbers = winningNumbers.split(" ");
    for (let number of receivedNumbers.matchAll(`[0-9]+`)) {
      if (winningNumbers.includes(number[0])) {
        cardMatches += 1;
      }
    }
    for (let i = matchArray[index]; i > 0; i--) {
      for (let x = 1; x <= cardMatches; x++) {
        matchArray[index + x] += 1;
        totalCardCount += 1;
      }
      matchArray[index] -= 1;
    }
  });
  return totalCardCount;
};

console.log(part2());
