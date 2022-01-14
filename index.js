const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const generateToken = require('./utils/generateToken');
const { validateEmail, validatePassword } = require('./middleware/validation');

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
   
  const filteredTalker = talker.find((p) => p.id === +id);

  if (!filteredTalker) { 
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
  }

  return res.status(200).json(filteredTalker);
});

// REQ 3

app.post('/login', validatePassword, validateEmail, (_req, res) => {
  const token = generateToken(16);

  return res.status(200).json({ token });
});

// não remova esse endpoint, e para o avaliador 

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
