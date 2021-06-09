const connection = require('./connection')
const mongodb = require('mongodb')
const { findByCUIT } = require('./clientes')
const { findByPatente } = require('./vehiculos')

async function getAllViajes(){
    const connectiondb = await connection.getConnection()
    const viajes = await connectiondb.db('TransportesRaffi')
    .collection('Viajes')
    .find()
    .toArray()
  
    return viajes
}

async function getViaje(id){
    const connectiondb = await connection.getConnection()
    const viaje  = await connectiondb.db('TransportesRaffi')
    .collection('Viajes')
    .findOne({_id : mongodb.ObjectID(id)})
  
    return viaje
}

async function addViaje(cuitCliente, patente, viaje){
    const vehiculo = await findByPatente(patente)
    const cliente = await findByCUIT(cuitCliente)

    if(!vehiculo){
         throw new Error(`No se encontro ningun vehiculo con patente ${patente}`)        
     }

    if(!cliente){
        throw new Error(`No se encontro ningun cliente con id ${cuitCliente}`)        
    }

    viaje.vehiculo = vehiculo
    viaje.cliente = cliente

    const connectiondb = await connection.getConnection()
    const result = await connectiondb.db('TransportesRaffi')
    .collection('Viajes')
    .insertOne(viaje)
    
    return viaje
}

async function deleteViaje(id) {
    const viaje = await getViaje(id)
    
    if(!viaje){
        throw new Error(`No se encotro ningun viaje con id ${id}`)
    }

    const connectiondb = await connection.getConnection()
    
    const result = connectiondb.db('TransportesRaffi')
    .collection('Viajes')
    .deleteOne({_id : mongodb.ObjectID(id)})


    return result
}


module.exports = { getAllViajes, getViaje, addViaje, deleteViaje }
