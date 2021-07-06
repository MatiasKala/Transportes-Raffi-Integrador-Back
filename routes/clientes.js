var express = require('express');
var router = express.Router();
const data = require('../data/clientes')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


// /clientes

router.get('/',auth,authAdmin, async function(req, res, next) {
  const clientes = await data.getAllClientes()
  res.send(clientes)
});

router.get('/:id',auth,authAdmin, async function(req, res, next) {
  try {
    const cliente = await data.getCliente(req.params.id)
    res.send(cliente)    
  } catch (error) {
    res.send(error.message)    
    console.error(error)
  }

});

router.post('/',auth,authAdmin, async (req, res) =>{
  try {
    const result = await data.addCliente(req.body)
    res.send(result)
  } catch (error) {
    console.log(error.message);
    res.status(403).send({error:error.message})
  }
});

router.put('/:id', auth,authAdmin, async function(req, res, next) {
  try {
    const result = await data.putCliente(req.params.id,req.body)
    res.send(result)    
  } catch (error) {
    console.log(error.message);
    res.status(403).send({error:error.message})
  }
});

router.delete('/:id', auth,authAdmin, async function(req, res, next) {
  try {
    const result = await data.deleteCliente(req.params.id)
    res.send(result)    
  } catch (error) {
    res.send(error.message)    
    console.error(error)
  }

});

module.exports = router;
