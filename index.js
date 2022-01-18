/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
/* const { json } = require('body-parser'); */
const generateToken = require('./utils/generateToken');
const { validateEmail, 
  validatePassword, 
  validateToken, 
  validateAge, 
  validateName, 
  validateTalk, 
  validateRate,
  validateDate } = require('./middleware/validation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

function getTalker() {
  return fs.readFile('./talker.json', 'utf-8')
  .then((file) => JSON.parse(file));
}

async function setTalker(newTalker) {
  return fs.writeFile('./talker.json', JSON.stringify(newTalker));
}

// REQ 1
app.get('/talker', async (_req, res) => {
  const talker = await getTalker();

  if (!talker) return res.status(200).json({});

  return res.status(200).json(talker);
});

// REQ 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalker();
   
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

// REQ 4
app.post('/talker',
validateToken,  
validateAge, 
validateName, 
validateTalk,
validateRate,
validateDate, 
 async (req, res) => {
   const { name, age, talk } = req.body;

   const talkerList = await getTalker();
  
   talkerList.push({ id: talkerList.length + 1, name, age, talk });

   await setTalker(talkerList);

  return res.status(201).json({ id: talkerList.length, name, age, talk });
});

// REQ 5

app.put('/talker/:id', 
validateToken, 
validateName, 
validateAge,
validateTalk,
validateRate,
validateDate, 
 async (req, res) => {
   const { id } = req.params;
  const { name, age, talk } = req.body;

  const talkerList = await getTalker();

  const selectedIndex = talkerList.findIndex((talker) => talker.id === +id);

  talkerList[selectedIndex] = { ...talkerList[selectedIndex], name, age, talk };

   await setTalker(talkerList);

  return res.status(200).json(talkerList[selectedIndex]);
});

// Req 6 

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const talkerList = await getTalker();
  const selectedIndex = talkerList.findIndex((talker) => talker.id === +id);
  talkerList.splice(selectedIndex, 1);
  await setTalker(talkerList);
  return res.status(204).end();
});

// Req 7

app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkerList = await getTalker();

  const findTalker = talkerList.filter(
    (t) => t.name.toLowerCase().includes(q.toLowerCase()),
);
 return res.status(200).json(findTalker);
});

// não remova esse endpoint, e para o avaliador 

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
