const jsonwebtoken = require('jsonwebtoken')

function auth(req, res, next){
    try {

        const token = req.header('Authorization').replace('Bearer ', '')
        
        jsonwebtoken.verify(token, process.env.SECRET)  

        next()
    } catch (error) {
        console.log(error)
       res.status(401).send({error: error.message})
    }
}

module.exports = auth