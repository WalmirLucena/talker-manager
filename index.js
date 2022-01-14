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

// REQ 1
app.get('/talker', (req, res) => {
  const talker = getTalker();

  if (!talker) return res.status(200).json({});

  return res.status(200).json(JSON.parse(talker));
});

// REQ 2
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talker = JSON.parse(getTalker());
  console.log(typeof (talker));
  
  const filteredTalker = talker.find((p) => p.id === +id);

  console.log(filteredTalker);

  if (!filteredTalker) { 
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
  }

  return res.status(200).json(filteredTalker);
});

// não remova esse endpoint, e para o avaliador 

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
