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

module.exports = {
    validatePassword,
    validateEmail,
};