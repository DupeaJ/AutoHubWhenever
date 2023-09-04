const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);


module.exports = { readFromFile, writeToFile, readAndAppend };