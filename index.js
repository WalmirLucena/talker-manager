const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

function getTalker() {
  return fs.readFileSync('./talker.json', 'utf-8');
}

// não remova esse endpoint, e para o avaliador 
app.get('/talker', (req, res) => {
  const talker = getTalker();

  if (!talker) return res.status(200).json({});

  return res.status(200).json(JSON.parse(talker));
});

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
