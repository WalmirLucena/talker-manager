const fs = require('fs').promises;

function getTalker() {
    return fs.readFile('./talker.json', 'utf-8')
    .then((file) => JSON.parse(file));
}

module.exports = getTalker;