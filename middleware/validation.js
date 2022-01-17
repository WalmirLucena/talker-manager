const validatePassword = (req, res, next) => {
    const { password } = req.body;

    if (!password) { 
        return res.status(400).json({ message: 'O campo "password" é obrigatório' }); 
}
    if (password.length < 6) { 
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
    } 
    next();
};

const validateEmail = (req, res, next) => {
    const { email } = req.body;

  if (!email) { return res.status(400).json({ message: 'O campo "email" é obrigatório' }); }

  if (!email.includes('@')
  || !email.includes('.com')) { 
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
    }
  
  next();
};

const validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    const tokenRegex = /^[a-zA-Z0-9]{16}$/;

    if (!token) { 
        return res.status(401).json({ message: 'Token não encontrado' }); 
    }
    
    if (!tokenRegex.test(token)) { 
        return res.status(401).json({ message: 'Token inválido' }); 
    }
    next();
};

const validateName = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' }); 
    }

    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }

    next();
};

const validateAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }

    if (age < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};

const validateTalk = (req, res, next) => {
    const { talk } = req.body;
    
    if (!talk) {
        return res.status(400).json(
            { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
);
        }
    
    next();
};

const validateDate = (req, res, next) => {
// https://medium.com/xp-inc/regex-um-guia-pratico-para-express%C3%B5es-regulares-1ac5fa4dd39f 
    const { talk } = req.body;
    const { watchedAt } = talk;
    const dateRegex = /(\d{2})\/?(\d{2})?\/(\d{4})/;
    if (!watchedAt) {
        return res.status(400).json(
            { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
);
    }
    if (!dateRegex.test(watchedAt)) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

const validateRate = (req, res, next) => {
    const { talk: { rate } } = req.body;

    if (rate === undefined) {
        return res.status(400).json(
            { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
);
    }

    if (rate % 1 !== 0 || rate < 1 || rate > 5) {
        return res.status(400).json(
            { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
);
    }
    next();
};

module.exports = {
    validatePassword,
    validateEmail,
    validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateDate,
    validateRate,
};