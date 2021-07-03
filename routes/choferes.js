var express = require('express');
var router = express.Router();
const data = require('../data/choferes')
const auth = require('../middleware/auth')
/* GET users listing. */

// /choferes

router.get('/',auth, async function(req, res, next) {
  const choferes = await data.getAllChoferes()
  res.send(choferes)
});

router.get('/:id',auth, async function(req, res, next) {
  try {
    const chofer = await data.getChofer(req.params.id)
    res.send(chofer)    
  } catch (error) {
    res.send(error.message)    
    console.error(error)
  }

});

router.post('/',auth, async (req, res) =>{
  try {
    const result = await data.addChofer(req.body)
    res.send(result)
  } catch (error) {
    console.error(error.message);
    res.status(403).send({error:error.message})
  }
});

router.put('/:id', auth, async function(req, res, next) {
  try {
    const result = await data.putChofer(req.params.id,req.body)
    res.send(result)    
  } catch (error) {
    console.error(error);
    res.status(403).send({error:error.message})
  }
});

router.delete('/:id', auth, async function(req, res, next) {
  try {
    const result = await data.deleteChofer(req.params.id)
    res.send(result)    
  } catch (error) {
    res.send(error.message)    
    console.error(error)
  }

});

module.exports = router;
