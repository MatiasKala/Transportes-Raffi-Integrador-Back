var express = require('express');
var router = express.Router();
const data = require('../data/hojaDeRuta')

// /hojaDeRuta

router.get('/clima', async function(req, res, next) {
  const clima = await data.getClimaBuenosAires()
  res.send(clima)
});

module.exports=router