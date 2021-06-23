var express = require('express');
var router = express.Router();
const data = require('../data/hojaDeRuta')
const auth = require('../middleware/auth')

// /hojaDeRuta

router.get('/clima', async function(req, res, next) {
    try {
        const clima = await data.getClimaBuenosAires()
        res.send(clima)
    } catch (error) {
        console.log(error);
        res.send(error)
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