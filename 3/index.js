const fs = require("node:fs");
const input = fs.readFileSync("3/input.txt", "utf8");
// const input =
//     `467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`

const part1 = () => {
    let resultCount = 0;
    let previousLine;
    input.split(/\n/).forEach((game, index, array) => {
        for (let match of game.matchAll(`[0-9]+`)) {
            let left = match.index > 0 ? game[match.index - 1] : null;
            let right = match.index + match[0].length < game.length ? game[match.index + match[0].length] : null;
            let top = index > 0 ? previousLine.slice(match.index - 1 >= 0 ? match.index - 1 : match.index, (match.index + match[0].length + 1) < previousLine.length ? match.index + match[0].length + 1 : match.index + match[0].length) : null;
            let down = index < array.length - 1 ? array[index + 1].slice(match.index - 1 >= 0 ? match.index - 1 : match.index, (match.index + match[0].length + 1) < array[index + 1].length ? match.index + match[0].length + 1 : match.index + match[0].length) : null;
            if (left && left.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/)) {
                resultCount += +match[0];
            } else if (right && right.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/)) {
                resultCount += +match[0];
            } else if (top && top.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/)) {
                resultCount += +match[0];
            } else if (down && down.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/)) {
                resultCount += +match[0];
            }
        }
        previousLine = game;
    })
    return resultCount;
}

const part2 = () => {
    let resultCount = 0;
    let previousLine;
    let asterisks = {};
    input.split(/\n/).forEach((game, index, array) => {
        for (let match of game.matchAll(`[0-9]+`)) {
            let left = match.index > 0 ? game[match.index - 1] : null;
            let right = match.index + match[0].length < game.length ? game[match.index + match[0].length] : null;
            let top = index > 0 ? previousLine.slice(match.index - 1 >= 0 ? match.index - 1 : match.index, (match.index + match[0].length + 1) < previousLine.length ? match.index + match[0].length + 1 : match.index + match[0].length) : null;
            let down = index < array.length - 1 ? array[index + 1].slice(match.index - 1 >= 0 ? match.index - 1 : match.index, (match.index + match[0].length + 1) < array[index + 1].length ? match.index + match[0].length + 1 : match.index + match[0].length) : null;
            if (left && left.match(/[*]/g)) {
                let key = index.toString() + (match.index - 1).toString();
                !!asterisks[key] ? asterisks[key].push(match[0]) : asterisks[key] = [match[0]];
            } else if (right && right.match(/[*]/g)) {
                let key = index.toString() + (match.index + match[0].length).toString();
                !!asterisks[key] ? asterisks[key].push(match[0]) : asterisks[key] = [match[0]];
            } else if (top && top.match(/[*]/g)) {
                let key = (index - 1).toString() + ((match.index > 0 ? match.index - 1 : 0) + top.matchAll(/[*]/g).next().value.index).toString();
                !!asterisks[key] ? asterisks[key].push(match[0]) : asterisks[key] = [match[0]];
            } else if (down && down.match(/[*]/g)) {
                let key = (index + 1).toString() + ((match.index > 0 ? match.index - 1 : 0) + down.matchAll(/[*]/g).next().value.index).toString();
                !!asterisks[key] ? asterisks[key].push(match[0]) : asterisks[key] = [match[0]];
            }
        }
        previousLine = game;
    })
    Object.keys(asterisks).forEach((a) => {
        if (asterisks[a].length === 2) resultCount += asterisks[a].reduce((a, b) => a * b)
    })
    return resultCount;
}


console.log(part2());
