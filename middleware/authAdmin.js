const jsonwebtoken = require('jsonwebtoken')
const { getUser } = require('../data/usuarios')
const chalk = require('chalk');

async function authAdmin(req, res, next){
    try {

        const token = req.header('Authorization').replace('Bearer ', '')

        const result = await jsonwebtoken.verify(token, process.env.SECRET)
        
        const user = await getUser(result._id)

        if (user.rol.includes('ADMINISTRADOR')) {
            console.log('ES ADMIN');
            next()
        } else {
            console.log('NO ES ADMIN');
            throw new Error('Este recurso solo puede ser accedido por Administradores')
        }
    } catch (error) {
        console.log(error)
       res.status(401).send({error: error.message})
    }
}

module.exports = authAdmin;