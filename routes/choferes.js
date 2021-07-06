var express = require('express');
var router = express.Router();
const data = require('../data/choferes')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

/* GET users listing. */

// /choferes

router.get('/',auth,authAdmin, async function(req, res, next) {
  try {
    const choferes = await data.getAllChoferes()
    res.send(choferes)
  } catch (error) {
    res.status(401).send(error)
  }
});

router.get('/:id',auth,authAdmin, async function(req, res, next) {
  try {
    const chofer = await data.getChofer(req.params.id)
    res.send(chofer)    
  } catch (error) {
    res.send(error.message)    
    console.error(error)
  }

});

router.post('/',auth,authAdmin, async (req, res) =>{
  try {
    const result = await data.addChofer(req.body)
    res.send(result)
  } catch (error) {
    console.error(error.message);
    res.status(403).send({error:error.message})
  }
});

router.put('/:id', auth,authAdmin, async function(req, res, next) {
  try {
    const result = await data.putChofer(req.params.id,req.body)
    res.send(result)    
  } catch (error) {
    console.error(error);
    res.status(403).send({error:error.message})
  }
});

router.delete('/:id', auth,authAdmin, async function(req, res, next) {
  try {
    const result = await data.deleteChofer(req.params.id)
    res.send(result)    
  } catch (error) {
    res.send(error.message)    
    console.error(error)
  }

});

module.exports = router;
