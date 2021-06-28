var express = require('express');
var router = express.Router();
const viajesDAO = require('../data/viajes')
const vehiculosDAO = require('../data/vehiculos')
const auth = require('../middleware/auth')
/* GET viajes listing. */

// /viajes

router.get('/',auth, async function(req, res, next) {
  const viajes = await viajesDAO.getAllViajes()
  res.send(viajes)
});

router.get('/:id',auth, async function(req, res, next) {
  try {
    const viaje = await viajesDAO.getViaje(req.params.id)
    res.send(viaje)    
  } catch (error) {
    res.send(error.message)    
    console.error(error)
  }

});

router.post('/',auth, async (req, res) =>{
  const result = await viajesDAO.addViaje(req.body)
  res.send(result)
});

router.put('/:idClienteoViaje/:idViaje',async function(req, res, next) {
  try {
    console.log(req.params);
    const result = await viajesDAO.asignarClienteoVehiculoAviaje(req.params.idClienteoViaje,req.params.idViaje)
    res.send(result)    
  } catch (error) {
    res.send(error.message)    
    console.error(error);
  }
});

router.put('/:id', auth, async function(req, res, next) {
  try {
    console.log('ID de los viajes ',req.params.id)
    console.log('Modificaciones ', req.body)
    const result = await viajesDAO.putViaje(req.params.id,req.body)
    res.send(result)    
  } catch (error) {
    res.send(error.message)    
    console.error(error);
  }
});

router.delete('/:id', auth, async function(req, res, next) {
  try {
    const result = await viajesDAO.deleteViaje(req.params.id)
    res.send(result)    
  } catch (error) {
    res.send(error.message)    
    console.error(error)
  }

});

module.exports = router;
