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

async function addViaje(viaje){
    const connectiondb = await connection.getConnection()
    const result = await connectiondb.db('TransportesRaffi')
    .collection('Viajes')
    .insertOne(viaje)
    
    return result
}

async function putViaje(id,viaje){
    const connectiondb = await connection.getConnection()
    
    const oldViaje= await getViaje(id)

    if(!oldViaje){
        throw new Error(`No se encotro ningun viaje con id ${id}`)       
    }
    console.log('VIAJE VIEJO   ', oldViaje);
    console.log('VIAJE NUEVO   ', viaje);
    //Validar Parametros
    const result = await connectiondb.db('TransportesRaffi')
    .collection('Viajes')
    .updateOne(
        {_id : mongodb.ObjectID(id)},
        {$set :
            {
                "fechaEntrega" :viaje.fechaEntrega ?? oldViaje.fechaEntrega,
                "domicilioEntrega" :viaje.domicilioEntrega ?? oldViaje.domicilioEntrega,
                "descripcionPaquete" :viaje.descripcionPaquete ?? oldViaje.descripcionPaquete,  
            }
        })

    return result

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


module.exports = { getAllViajes, getViaje, addViaje, putViaje, deleteViaje }
