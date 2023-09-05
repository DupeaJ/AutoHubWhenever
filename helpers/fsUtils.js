const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const appendFile = util.promisify(fs.appendFile);

// Define writeToFile function
const writeToFile = (filename, data) => {
    return writeFile(filename, data);
};

// Define readAndAppend function
const readAndAppend = (filename, data) => {
    return appendFile(filename, data);
};

module.exports = { readFromFile, writeToFile, readAndAppend };
