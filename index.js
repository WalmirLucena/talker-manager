const express = require('express');
const bodyParser = require('body-parser');
const router = require('./middleware/router');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use('/', router);

// não remova esse endpoint, e para o avaliador 

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
