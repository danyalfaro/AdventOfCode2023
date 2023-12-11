const fs = require("node:fs");
const input = fs.readFileSync("2/input.txt", "utf8");
const partOne = () => {
  const cubes = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let isPossible = [];
  let resultCount = 0;

  input.split(/\n/).forEach((game, index) => {
    const startIndex = game.indexOf(":");
    let values = game.slice(startIndex + 1);
    const rounds = values.split(";");
    const grabs = rounds.map((round) => {
      let grab = round.split(",");
      const values = grab.map((g) => {
        const amount = g.split(" ")[1];
        const color = g.split(" ")[2];
        return cubes[color] >= parseInt(amount);
      });
      return values.filter((value) => !value).length === 0;
    });
    isPossible.push(grabs.filter((value) => !value).length === 0);
  });
  isPossible.forEach((val, index) => {
    if (val) resultCount += index + 1;
  });
  console.log(resultCount);
};
const partTwo = () => {
  let resultCount = 0;
  let minCubes = [];
  input.split(/\n/).forEach((game, index) => {
    const startIndex = game.indexOf(":");
    let values = game.slice(startIndex + 1);
    const rounds = values.split(";");
    const grabs = rounds.map((round) => {
      let grab = round.split(",");
      const values = grab.map((g) => {
        const amount = g.split(" ")[1];
        const color = g.split(" ")[2];
        if (!minCubes[index]) {
          minCubes[index] = { red: 0, blue: 0, green: 0 };
        }
        minCubes[index] = {
          ...minCubes[index],
          [color]: Math.max(amount, minCubes[index][color]),
        };
        return { [color]: parseInt(amount) };
      });
      return values;
    });
  });
  minCubes.forEach((game) => {
    resultCount += game.red * game.blue * game.green;
  });
  console.log(resultCount);
};
partTwo();
