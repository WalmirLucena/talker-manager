const fs = require('fs').promises;

async function setTalker(newTalker) {
    return fs.writeFile('./talker.json', JSON.stringify(newTalker));
  }

module.exports = setTalker;