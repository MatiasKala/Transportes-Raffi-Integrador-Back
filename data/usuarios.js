const connection = require('./connection')
const mongodb = require('mongodb')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

async function getAllUsers(){
    const connectiondb = await connection.getConnection()
    const users = await connectiondb.db('TransportesRaffi')
    .collection('Usuarios')
    .find()
    .toArray()
  
    return users
}

async function getUser(id){
    const connectiondb = await connection.getConnection()
    const user = await connectiondb.db('TransportesRaffi')
    .collection('Usuarios')
    .findOne({_id : mongodb.ObjectID(id)})
  
    return user
}

async function addUser(user){
    const connectiondb = await connection.getConnection()

    user.password = await bcrypt.hash(user.password,4)

    const result = await connectiondb.db('TransportesRaffi')
    .collection('Usuarios')
    .insertOne(user)

    return result
}

async function findByCredentials(email , password){
    const connectiondb = await connection.getConnection()

    const user = await connectiondb.db('TransportesRaffi')
    .collection('Usuarios')
    .findOne({email : email})

    if(!user){
        throw new Error('Credenciales no validas');
    }

    const result = await bcrypt.compare(password, user.password)

    if(!result){
        throw new Error('Credenciales no validas');
    }

    return user
}

function generateAuthToken(user){
    const token = jsonwebtoken.sign({_id:user._id}, 'claveSecreta', {expiresIn: '2h'});
    return token;
}

module.exports = { getAllUsers, getUser, addUser,findByCredentials,generateAuthToken }