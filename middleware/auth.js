const jsonwebtoken = require('jsonwebtoken');

function auth(req, res, next){
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        
        const user = jsonwebtoken.verify(token, 'claveSecreta');  
        console.log(user);      
        next();
    } catch (error) {
       res.status(401).send({error: error.message});
    }
}

module.exports = auth;