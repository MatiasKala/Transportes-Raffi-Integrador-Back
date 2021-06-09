const connection = require('./connection')
const mongodb = require('mongodb')


async function getAllClientes(){
    const connectiondb = await connection.getConnection()
    const clientes = await connectiondb.db('TransportesRaffi')
    .collection('Clientes')
    .find()
    .toArray()
  
    return clientes
}

async function getCliente(id){
    const connectiondb = await connection.getConnection()
    const cliente = await connectiondb.db('TransportesRaffi')
    .collection('Clientes')
    .findOne({_id : mongodb.ObjectID(id)})
  
    return cliente
}

async function addCliente(cliente){
    const connectiondb = await connection.getConnection()
    const result = await connectiondb.db('TransportesRaffi')
    .collection('Clientes')
    .insertOne(cliente)

    return result
}

async function deleteCliente(id) {
    const cliente = await getCliente(id)
    
    if(!cliente){
        throw new Error(`No se encontro ningun cliente con id ${id}`)
    }

    const connectiondb = await connection.getConnection()
    
    const result = connectiondb.db('TransportesRaffi')
    .collection('Clientes')
    .deleteOne({_id : mongodb.ObjectID(id)})

    return result
}

async function findByCUIT(cuit){
    const connectiondb = await connection.getConnection()

    const chofer = await connectiondb.db('TransportesRaffi')
    .collection('Clientes')
    .findOne({cuit : cuit})

    if(!chofer){
        throw new Error(`No se encotro ningun cliente con CUIT ${cuit}`)
    }

    return chofer
}


module.exports = { getAllClientes, getCliente, addCliente, deleteCliente, findByCUIT }