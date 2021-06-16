var express = require('express');
var router = express.Router();
const data = require('../data/clientes')
const auth = require('../middleware/auth')

// /clientes

router.get('/',auth, async function(req, res, next) {
  const clientes = await data.getAllClientes()
  res.send(clientes)
});

router.get('/:id',auth, async function(req, res, next) {
  try {
    const cliente = await data.getCliente(req.params.id)
    res.send(cliente)    
  } catch (error) {
    res.send(error.message)    
    console.error(error)
  }

});

router.post('/',auth, async (req, res) =>{
  const result = await data.addCliente(req.body)
  res.send(result)
});

// router.put('/:id', auth, async function(req, res, next) {
//   try {
//     const result = await data.putCliente(req.params.id,req.body)
//     res.send(result)    
//   } catch (error) {
//     res.send(error.message)    
//     console.error(error);
//   }
// });

router.delete('/:id', auth, async function(req, res, next) {
  try {
    const result = await data.deleteCliente(req.params.id)
    res.send(result)    
  } catch (error) {
    res.send(error.message)    
    console.error(error)
  }

});

module.exports = router;
