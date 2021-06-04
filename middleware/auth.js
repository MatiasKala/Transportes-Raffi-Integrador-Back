const jsonwebtoken = require('jsonwebtoken');

function auth(req, res, next){
    try {

        console.log(`Pase por Auth`);      

        const token = req.header('Authorization').replace('Bearer ', '');
        
        jsonwebtoken.verify(token, 'claveSecreta');  

        next();
    } catch (error) {
       res.status(401).send({error: error.message});
    }
}

module.exports = auth;