var express = require('express');
var router = express.Router();
const data = require('../data/usuarios')
const auth = require('../middleware/auth')
/* GET users listing. */

// /usuarios

router.get('/',auth, async function(req, res, next) {
  const users = await data.getAllUsers()
  res.send(users)
});

router.get('/:id', async function(req, res, next) {
  const user = await data.getUser(req.params.id)
  res.send(user)
});

router.post('/', async (req, res) =>{
  const result = await data.addUser(req.body)
  res.send(result)
});

router.post('/login', async (req, res)=>{
  try {
    const user = await data.findByCredentials(req.body.email, req.body.password)
    const token = data.generateAuthToken(user)
    res.send({user, token})
  } catch (error) {
      res.status(401).send(error.message)
  }
});

module.exports = router;
