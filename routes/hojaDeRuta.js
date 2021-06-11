var express = require('express');
var router = express.Router();
const data = require('../data/hojaDeRuta')

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

module.exports=router