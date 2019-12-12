const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = require('express').Router();

const userModel = require('../model/user');

const createToken = () => {
  return jwt.sign({}, 'secret', { expiresIn: '1h' });
};

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const pw = req.body.password;

  userModel.findOne({email: email})
  .then((result) => {
    return bcrypt.compare(pw, result.pw)
  })
  .then((result) => {
    if(result){
      const token = createToken();
      res.send({authenticated: true, message: "Login Successfull", token:token, user: { email: email } });
    } else {
      throw err;
    }
  })
  .catch((err) => {
    res
      .status(401)
      .json({ message: 'Authentication failed, invalid username or password.' });
  })
});

router.post('/signup', (req, res, next) => {
  const email = req.body.email;
  const pw = req.body.password;
  // Hash password before storing it in database => Encryption at Rest
  bcrypt
    .hash(pw, 12)
    .then(hashedPW => {
      return hashedPW
      
    })
    .then((result) => {
      userModel.create({
        email: email,
        pw: result
      })
    .then(() => {

      const token = createToken();
      res
        .status(201)
        .json({ token: token, user: { email: email} });
    })
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Creating the user failed.' });
    });
  // Add user to database
});

module.exports = router;
