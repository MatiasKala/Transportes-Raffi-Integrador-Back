const jsonwebtoken = require('jsonwebtoken')
const chalk = require('chalk');

function auth(req, res, next){
    try {

        console.log(chalk.magentaBright(req.header('Authorization')));

        const token = req.header('Authorization').replace('Bearer ', '')
        
        jsonwebtoken.verify(token, process.env.SECRET)  

        next()
    } catch (error) {
        console.log(error)
       res.status(401).send({error: error.message})
    }
}

module.exports = auth