var express = require('express')
var router = express.Router()
const data = require('../data/hojaDeRuta')
const {getViajesDelDia} = require('../data/viajes')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

// /hojaDeRuta

router.get('/viajes',auth, async function(req, res, next) {
  try {
      const viajes = await getViajesDelDia()
      res.send(viajes)
  } catch (error) {
      console.log(error)
      res.send(error)
  }
});

router.get('/clima',auth, async function(req, res, next) {
    try {
        const clima = await data.getClima()
        res.send(clima)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
});

router.get('/clima/icono',auth, async function(req, res, next) {
    try {
        const codigo = await data.getIconoClima()
        res.send(codigo)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
});

router.post('/coordenadas',auth, async (req, res) =>{
    const result = await data.obtenerCoordenadas(req.body)
    res.send(result)
});

router.post('/ruta',auth, async (req, res) =>{
    const result = await data.calcularRuta(req.body)
    res.send(result)
});

module.exports=router