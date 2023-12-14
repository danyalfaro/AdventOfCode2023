const fs = require("node:fs");
const input = fs.readFileSync("3/input.txt", "utf8");
// const input =
//     `467+.114..
// ...*.....
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`

let resultCount = 0;
let toAdd = [];
let previousLine;
input.split(/\n/).forEach((game, index, array) => {
    for (let match of game.matchAll(`[0-9]+`)) {
        let left = match.index > 0 ? game[match.index - 1] : null;
        let right = match.index + match[0].length < game.length ? game[match.index + match[0].length] : null;
        let top = index > 0 ? previousLine.slice(match.index - 1 >= 0 ? match.index - 1 : match.index, (match.index + match[0].length + 1) < previousLine.length ? match.index + match[0].length + 1 : match.index + match[0].length) : null;
        let down = index < array.length - 1 ? array[index + 1].slice(match.index - 1 >= 0 ? match.index - 1 : match.index, (match.index + match[0].length + 1) < array[index + 1].length ? match.index + match[0].length + 1 : match.index + match[0].length) : null;
        if (left && left.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/)) {
            console.log('LEFT', left);
            toAdd.push(match[0]);
            resultCount += +match[0];
        }
        else if (right && right.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/)) {
            console.log('RIGHT', right);
            toAdd.push(match[0]);
            resultCount += +match[0];

        }
        else if (top && top.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/)) {
            console.log('TOP', top);
            toAdd.push(match[0]);
            resultCount += +match[0];

        }
        else if (down && down.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/)) {
            console.log('DOWN', down);
            toAdd.push(match[0]);
            resultCount += +match[0];

        }
    }
    previousLine = game;
})
console.log(toAdd, resultCount)
