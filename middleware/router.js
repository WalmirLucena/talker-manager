const express = require('express');
const getTalker = require('../utils/getTalker');
const setTalker = require('../utils/setTalker');
const { validateEmail, 
    validatePassword, 
    validateToken, 
    validateAge, 
    validateName, 
    validateTalk, 
    validateRate,
    validateDate } = require('./validation');
const generateToken = require('../utils/generateToken');

const router = express.Router();

router.get('/talker', async (_req, res) => {
    const talker = await getTalker();
  
    if (!talker) return res.status(200).json({});
  
    return res.status(200).json(talker);
});

router.get('/talker/search', validateToken, async (req, res) => {
    const { q } = req.query;
    const talkerList = await getTalker();
  
    const findTalker = talkerList.filter(
      (t) => t.name.includes(q),
  );
   return res.status(200).json(findTalker);
  });

router.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talker = await getTalker();
     
    const filteredTalker = talker.find((p) => p.id === +id);
  
    if (!filteredTalker) { 
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
    }
  
    return res.status(200).json(filteredTalker);
  });

 router.post('/login', validatePassword, validateEmail, (_req, res) => {
    const token = generateToken(16);
  
    return res.status(200).json({ token });
  });

 router.post('/talker',
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

router.put('/talker/:id', 
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

router.delete('/talker/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    const talkerList = await getTalker();
    const selectedIndex = talkerList.findIndex((talker) => talker.id === +id);
    talkerList.splice(selectedIndex, 1);
    await setTalker(talkerList);
    return res.status(204).end();
  });

module.exports = router;