const fs = require("node:fs");
const input = fs.readFileSync("4/input.txt", "utf8");

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

console.log(part1());
