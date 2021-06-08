var express = require('express');
var router = express.Router();
const data = require('../data/viajes')
const auth = require('../middleware/auth')
/* GET viajes listing. */

// /viajes

router.get('/',auth, async function(req, res, next) {
  const viajes = await data.getAllViajes()
  res.send(viajes)
});

router.get('/:id',auth, async function(req, res, next) {
  try {
    const viaje = await data.getViaje(req.params.id)
    res.send(viaje)    
  } catch (error) {
    res.send(error.message)    
    console.error(error)
  }

});

router.post('/',auth, async (req, res) =>{
  const result = await data.addViaje(req.body)
  res.send(result)
});


router.put('/:id', auth, async function(req, res, next) {
  try {
    const result = await data.putViaje(req.params.id,req.body)
    res.send(result)    
  } catch (error) {
    res.send(error.message)    
    console.error(error);
  }
});

// router.put('/:patente/:idChofer', auth, async function(req, res, next) {
//   try {
//     const result = await data.asignarChoferVehiculo(req.params.patente,req.params.idChofer)
//     res.send(result)    
//   } catch (error) {
//     res.send(error.message)    
//     console.error(error);
//   }
// });

router.delete('/:id', auth, async function(req, res, next) {
  try {
    const result = await data.deleteViaje(req.params.id)
    res.send(result)    
  } catch (error) {
    res.send(error.message)    
    console.error(error)
  }

});

module.exports = router;
