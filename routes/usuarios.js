const { json } = require('express');
var express = require('express');
var router = express.Router();
const data = require('../data/usuarios')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
/* GET users listing. */

// /usuarios

router.get('/', async function(req, res, next) {
  const users = await data.getAllUsers()
  res.send(users)
});

router.get('/:id',auth,authAdmin, async function(req, res, next) {
  try {
    const user = await data.getUser(req.params.id)
    res.send(user)    
  } catch (error) {
    res.send(error.message)    
    console.error(error)
  }

});

router.put('/:id', auth,authAdmin, async function(req, res, next) {
  try {
    const result = await data.putUser(req.params.id,req.body)
    res.send(result)    
  } catch (error) {
    console.error(error);
    res.send(error.message)    
  }
});

router.delete('/:id', auth,authAdmin, async function(req, res, next) {
  try {
    const result = await data.deleteUser(req.params.id)
    res.send(result)    
  } catch (error) {
    res.send(error.message)    
    console.error(error)
  }

});


router.post('/', async (req, res) =>{
  try {
    const result = await data.addUser(req.body)
    res.send(result)
  } catch (error) {
    console.log(error);
    res.status(403).send(error.message)
  }
});

router.post('/login', async (req, res)=>{
  try {
    const user = await data.findByCredentials(req.body.email, req.body.password)
    const token = data.generateAuthToken(user)
    res.send({user, token})
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message)
  }
});

module.exports = router;
