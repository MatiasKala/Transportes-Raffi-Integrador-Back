var express = require('express');
var router = express.Router();
const data = require('../data/vehiculos')
const auth = require('../middleware/auth')
/* GET users listing. */

// /vehiculos

router.get('/',auth, async function(req, res, next) {
  const vehiculos = await data.getAllVehiculos()
  res.send(vehiculos)
});

router.get('/:id',auth, async function(req, res, next) {
  try {
    const vehiculo = await data.getVehiculo(req.params.id)
    res.send(vehiculo)    
  } catch (error) {
    res.send(error.message)    
    console.error(error)
  }

});

router.post('/',auth, async (req, res) =>{
  const result = await data.addVehiculo(req.body)
  res.send(result)
});


router.put('/:id', auth, async function(req, res, next) {
  try {
    const result = await data.putVehiculo(req.params.id,req.body)
    res.send(result)    
  } catch (error) {
    res.send(error.message)    
    console.error(error);
  }
});

router.put('/:idVehiculo/:idChofer', auth, async function(req, res, next) {
  try {
    const result = await data.asignarChoferAvehiculo(req.params.idVehiculo,req.params.idChofer)
    res.send(result)    
  } catch (error) {
    res.send(error.message)    
    console.error(error);
  }
});

router.delete('/:id', auth, async function(req, res, next) {
  try {
    const result = await data.deleteVehiculo(req.params.id)
    res.send(result)    
  } catch (error) {
    res.send(error.message)    
    console.error(error)
  }

});

module.exports = router;
