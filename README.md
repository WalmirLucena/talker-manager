### Projeto Talker Manager

Este projeto consiste no desenvolvimento de uma API CRUD (**C**reate, **R**ead, **U**pdate e **D**elete) de palestrantes. Onde serão desenvolvidos alguns endpoints que irão ler e escrever em um arquivo, isso utilizando o módulo `fs`.

---

# Sumário

- [Habilidades](#habilidades)
- [Dependências necessárias](#dependências-necessárias)
  - [Antes de começar a desenvolver](#antes-de-começar-a-desenvolver)
- [Requisitos do projeto](#requisitos-do-projeto)
  - [Linter](#linter)
  - [Live Reload](#live-reload)
  - [Lista de requisitos](#lista-de-requisitos)
    - [1 - Crie o endpoint GET /talker](#1---crie-o-endpoint-get-talker)
    - [2 - Crie o endpoint GET /talker/:id](#2---crie-o-endpoint-get-talkerid)
    - [3 - Crie o endpoint POST /login](#3---crie-o-endpoint-post-login)
    - [4 - Crie o endpoint POST /talker](#4---crie-o-endpoint-post-talker)
    - [5 - Crie o endpoint PUT /talker/:id](#5---crie-o-endpoint-put-talkerid)
    - [6 - Crie o endpoint DELETE /talker/:id](#6---crie-o-endpoint-delete-talkerid)
    - [7 - Crie o endpoint GET /talker/search?q=searchTerm](#7---crie-o-endpoint-get-talkersearchqsearchterm)

---

# Habilidades

Neste projeto, é necessário as seguintes habilidades para a sua execução:

- Realizar operações assíncronas utilizando callbacks;
- Realizar operações assíncronas utilizando Promises;
- Ler e escrever arquivos localmente com NodeJS;
- Escrever seus próprios scripts que criam e consomem Promises;
- Reescrever código que usa callbacks para que use Promises;
- Realizar chamadas de funções de forma consciente;
- Entender os conceitos básicos de como o JavaScript funciona;
- Detectar e solucionar problemas no código de forma mais objetiva;
- Entender a diferença entre execução síncrona e assíncrona;
- Entender o que é o HTTP, o que é uma API e o que os dois têm a ver com o Express;
- Escrever APIs utilizando Node e Express;
- Entender a estrutura de uma aplicação Express e como organizar seu código;
- Criar rotas e aplicar middlewares.
---

# Dependências necessárias

## Antes de começar a desenvolver:

1. Instale as dependências:

- `npm install`

# Requisitos do projeto

### Linter

Foi utilizado o [ESLint](https://eslint.org/) para fazer a análise estática do seu código.

Este projeto já vem com as dependências relacionadas ao _linter_ configuradas nos arquivos `package.json`.

Para poder rodar o `ESLint` em um projeto basta executar o comando `npm install` dentro do projeto e depois `npm run lint`. Se a análise do `ESLint` encontrar problemas no seu código, tais problemas serão mostrados no seu terminal. Se não houver problema no seu código, nada será impresso no seu terminal.

Você pode também instalar o plugin do `ESLint` no `VSCode`, bastar ir em extensions e baixar o [plugin `ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

### Live reload

Foi utilizado o [Nodemon](https://nodemon.io) para monitorar as mudanças nos arquivos e reiniciar o servidor automaticamente.

Este projeto já vem com as dependências relacionadas ao _nodemon_ configuradas no arquivo `package.json`.

Para iniciar o servidor em modo de desenvolvimento basta executar o comando `npm run dev`. Este comando fará com que o servidor reinicie de forma automática ao salvar uma modificação realizada nos arquivos do projeto.

---

## Lista de requisitos

### Observações

1. Com exceção do requisito 3, todos os outros requisitos foram feitos utilizando o módulo `fs`.

2. O arquivo `talker.json` foi utilizado como base para fazer as requisições da API. As operações de leitura e escrita dos requisitos foram feitas nesse arquivo usando os métodos da biblioteca `fs`.

3. Para restaurar o arquivo `talker.json` utilize `npm run restore`.

4. Ao se deparar com o erro de que a porta já está em uso: `EADDRINUSE: address already in use 0.0.0.0:3000`, execute em seu terminal `killall node` isso finaliza todas as execuções do node.

---

### 1 - Crie o endpoint GET `/talker`

#### Os seguintes pontos serão avaliados:

- O endpoint deve retornar um array com todas as pessoas palestrantes cadastradas. Devendo retornar o `status 200`, com o seguinte corpo:

```json
[
  {
    "name": "Henrique Albuquerque",
    "age": 62,
    "id": 1,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  },
  {
    "name": "Heloísa Albuquerque",
    "age": 67,
    "id": 2,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  },
  {
    "name": "Ricardo Xavier Filho",
    "age": 33,
    "id": 3,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  },
  {
    "name": "Marcos Costa",
    "age": 24,
    "id": 4,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  }
]
```

- Caso não exista nenhuma pessoa palestrante cadastrada o endpoint deve retornar um array vazio e o `status 200`.


### 2 - Crie o endpoint GET `/talker/:id`

- O endpoint deve retornar uma pessoa palestrante com base no id da rota. Devendo retornar o `status 200` ao fazer uma requisição `/talker/1`, com o seguinte corpo:

  ```json
  {
    "name": "Henrique Albuquerque",
    "age": 62,
    "id": 1,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  }
  ```

- Caso não seja encontrada uma pessoa palestrante com base no id da rota, o endpoint deve retornar o `status 404` com o seguinte corpo:

  ```json
  {
    "message": "Pessoa palestrante não encontrada"
  }
  ```

### 3 - Crie o endpoint POST `/login`

#### Os seguintes pontos serão avaliados:

- O endpoint deve ser capaz de retornar um token aleatório de 16 caracteres que deverá ser utilizado nas demais requisições.

  - O endpoint deverá retornar um código de `status 200` com o token gerado, com o seguinte corpo:

  ```json
  {
    "token": "7mqaVRXJSp886CGr"
  }
  ```

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "email": "email@email.com",
    "password": "123456"
  }
  ```

- O campo `email` deverá ser um email válido. Ele é obrigatório.

  - Caso o campo não seja passado ou esteja vazio retorne um código de `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O campo \"email\" é obrigatório"
    }
    ```

  - Caso o email passado não seja um email válido retorne um código de `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O \"email\" deve ter o formato \"email@email.com\""
    }
    ```

- O campo `password` deverá ter pelo menos 6 caracteres.

  - Caso o campo não seja passado ou esteja vazio retorne um código de `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O campo \"password\" é obrigatório"
    }
    ```

  - Caso a senha não tenha pelo menos 6 caracteres retorne um código de `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O \"password\" deve ter pelo menos 6 caracteres"
    }
    ```

### 4 - Crie o endpoint POST `/talker`

#### Os seguintes pontos serão avaliados:

- O endpoint deve ser capaz de adicionar uma nova pessoa palestrante ao seu arquivo;

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "name": "Danielle Santos",
    "age": 56,
    "talk": {
      "watchedAt": "22/10/2019",
      "rate": 5
    }
  }
  ```

- A requisição deve ter o token de autenticação nos headers, no campo `authorization`.

  - Caso o token não seja encontrado retorne um código de `status 401`, com o seguinte corpo:

    ```json
    {
      "message": "Token não encontrado"
    }
    ```

  - Caso o token seja inválido retorne um código de `status 401`, com o seguinte corpo:

    ```json
    {
      "message": "Token inválido"
    }
    ```

- O campo `name` deverá ter no mínimo 3 caracteres. Ele é obrigatório.

  - Caso o campo não seja passado ou esteja vazio retorne um código de `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O campo \"name\" é obrigatório"
    }
    ```

  - Caso o nome não tenha pelo menos 3 caracteres retorne um código de `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O \"name\" deve ter pelo menos 3 caracteres"
    }
    ```

- O campo `age` deverá ser um inteiro e apenas pessoas maiores de idade (pelo menos `18 anos`) podem ser cadastrados. Ele é obrigatório.

  - Caso o campo não seja passado ou esteja vazio retorne um código de `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O campo \"age\" é obrigatório"
    }
    ```

  - Caso a pessoa palestrante não tenha pelo menos 18 anos retorne `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "A pessoa palestrante deve ser maior de idade"
    }
    ```

- O campo `talk` deverá ser um objeto com as seguintes chaves:

  - A chave `watchedAt` deve ser uma data no formato `dd/mm/aaaa`.

    - Caso a data não respeito o formato `dd/mm/aaaa` retorne `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""
    }
    ```

  - A chave `rate` deve ser um inteiro de 1 à 5.

    - Caso a nota não seja um inteiro de 1 à 5 retorne `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O campo \"rate\" deve ser um inteiro de 1 à 5"
      }
      ```

  - O campo `talk` é obrigatório e nenhuma das chaves citadas anteriormente podem ser vazias.

    - Caso o campo não seja informado, esteja vazio ou então alguma de suas chaves não tenham sido informadas retorne `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O campo \"talk\" é obrigatório e \"watchedAt\" e \"rate\" não podem ser vazios"
      }
      ```
- Caso esteja tudo certo, retorne o `status 201`  e a pessoa cadastrada.
- O endpoint deve retornar o `status 201` e a pessoa palestrante que foi cadastrada, da seguinte forma:

  ```json
  {
    "id": 1,
    "name": "Danielle Santos",
    "age": 56,
    "talk": {
      "watchedAt": "22/10/2019",
      "rate": 5
    }
  }
  ```

### 5 - Crie o endpoint PUT `/talker/:id`

#### Os seguintes pontos serão avaliados:

- O endpoint deve ser capaz de editar uma pessoa palestrante com base no id da rota, sem alterar o id registrado.

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "name": "Danielle Santos",
    "age": 56,
    "talk": {
      "watchedAt": "22/10/2019",
      "rate": 5
    }
  }
  ```
  
- A requisição deve ter o token de autenticação nos headers, no campo `authorization`.

  - Caso o token não seja encontrado retorne um código de `status 401`, com o seguinte corpo:

    ```json
    {
      "message": "Token não encontrado"
    }
    ```

  - Caso o token seja inválido retorne um código de `status 401`, com o seguinte corpo:

    ```json
    {
      "message": "Token inválido"
    }
    ```

- O campo `name` deverá ter no mínimo 3 caracteres. Ele é obrigatório.

  - Caso o campo não seja passado ou esteja vazio retorne um código de `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O campo \"name\" é obrigatório"
    }
    ```

  - Caso o nome não tenha pelo menos 3 caracteres retorne um código de `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O \"name\" ter pelo menos 3 caracteres"
    }
    ```

- O campo `age` deverá ser um inteiro e apenas pessoas maiores de idade (pelo menos `18 anos`) podem ser cadastrados. Ele é obrigatório.

  - Caso o campo não seja passado ou esteja vazio retorne um código de `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O campo \"age\" é obrigatório"
    }
    ```

  - Caso a pessoa palestrante não tenha pelo menos 18 anos retorne `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "A pessoa palestrante deve ser maior de idade"
    }
    ```

- O campo `talk` deverá ser um objeto com as seguintes chaves:

  - A chave `watchedAt` deve ser uma data no formato `dd/mm/aaaa`.

    - Caso a data não respeito o formato `dd/mm/aaaa` retorne `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""
    }
    ```

  - A chave `rate` deve ser um inteiro de 1 à 5.

    - Caso a nota não seja um inteiro de 1 à 5 retorne `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O campo \"rate\" deve ser um inteiro de 1 à 5"
      }
      ```

  - O campo `talk` é obrigatório e nenhuma das chaves citadas anteriormente podem ser vazias.

    - Caso o campo não seja informado, esteja vazio ou então alguma de suas chaves não tenham sido informadas retorne `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O campo \"talk\" é obrigatório e \"watchedAt\" e \"rate\" não podem ser vazios"
      }
      ```
- Caso esteja tudo certo, retorne o `status 200` e a pessoa editada.
- O endpoint deve retornar o `status 200` e a pessoa palestrante que foi editada, da seguinte forma:

  ```json
  {
    "id": 1,
   "name": "Danielle Santos",
    "age": 56,
    "talk": {
      "watchedAt": "22/10/2019",
      "rate": 4
    }
  }
  ```

### 6 - Crie o endpoint DELETE `/talker/:id`

#### Os seguintes pontos serão avaliados:

- A requisição deve ter o token de autenticação nos headers, no campo `authorization`.

  - Caso o token não seja encontrado retorne um código de `status 401`, com o seguinte corpo:

    ```json
    {
      "message": "Token não encontrado"
    }
    ```

  - Caso o token seja inválido retorne um código de `status 401`, com o seguinte corpo:

    ```json
    {
      "message": "Token inválido"
    }
    ```

- O endpoint deve deletar uma pessoa palestrante com base no id da rota. Devendo retornar o `status 204`, sem conteúdo na resposta.

### 7 - Crie o endpoint GET `/talker/search?q=searchTerm`

#### Os seguintes pontos serão avaliados:

- O endpoint deve retornar um array de palestrantes que contenham em seu nome o termo pesquisado no queryParam da URL. Devendo retornar o `status 200`, com o seguinte corpo:

  ```
  /search?q=Da
  ```

  ```json
  [
    {
      id: 1,
      name: "Danielle Santos",
      age: 56,
      talk: {
        watchedAt: "22/10/2019",
        rate: 5,
      },
    }
  ];
  ```

- A requisição deve ter o token de autenticação nos headers, no campo `authorization`.

  - Caso o token não seja encontrado retorne um código de `status 401`, com o seguinte corpo:

    ```json
    {
      "message": "Token não encontrado"
    }
    ```

  - Caso o token seja inválido retorne um código de `status 401`, com o seguinte corpo:

    ```json
    {
      "message": "Token inválido"
    }
    ```

- Caso `searchTerm` não seja informado ou esteja vazio, o endpoint deverá retornar um array com todos as pessoas palestrantes cadastradas, assim como no endpoint GET `/talker`, com um `status 200`.

- Caso nenhuma pessoa palestrante satisfaça a busca, o endpoint deve retornar o `status 200` e um array vazio.

**Dica** é importante ter atenção se essa rota não entra em conflito com as outras, já que a ordem das rotas faz diferença na interpretação da aplicação

---

