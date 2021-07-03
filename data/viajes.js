const connection = require('./connection')
const mongodb = require('mongodb')
const { findByCUIT, getCliente } = require('./clientes')
const { findByPatente, getVehiculo } = require('./vehiculos')
// const moment = require('moment')

async function getAllViajes(){
    const connectiondb = await connection.getConnection()
    const viajes = await connectiondb.db('TransportesRaffi')
    .collection('Viajes')
    .find()
    .toArray()
  
    return viajes
}

async function getViajesDelDia(){
    const connectiondb = await connection.getConnection()

    let fechaHoy= getFechaHoy()

    const viajes = await connectiondb.db('TransportesRaffi')
    .collection('Viajes')
    .find({fechaEntrega : fechaHoy})
    .toArray()

    return viajes
}

function getFechaHoy(){
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return ( [year, month, day].join('-'))
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
                "estado" :viaje.estado ?? oldViaje.estado,  
            }
        })

    return result

}

async function asignarClienteoVehiculoAviaje(idClienteOviaje,idViaje) { 
    
    console.log('LLEGUE AL ASIGNAR DATA');

    let viaje= await getViaje(idViaje)

    if(!viaje){
        throw new Error(`No se encontro ningun viaje con idViaje ${idViaje}`)      
    }

    const cliente = await getCliente(idClienteOviaje)

    if(!cliente){
        var vehiculo = await getVehiculo(idClienteOviaje)
        if(!vehiculo){
            throw new Error(`No se encontro ningun Cliente o Vehiculo con id ${idClienteOviaje}`)    
        }
    }

    console.log('soy vehiculo', vehiculo)
        
    const connectiondb = await connection.getConnection()

    if(cliente){
        
        const result = await connectiondb.db('TransportesRaffi')
        .collection('Viajes')
        .updateOne(
            {_id: mongodb.ObjectID(idViaje)},
            {$set :
                {
                    'cliente' :cliente,
                    // 'cliente' :'ID '+cliente._id +' CUIT '+ cliente.CUIT,
                }
        })
    }

    if(vehiculo){
        const result = await connectiondb.db('TransportesRaffi')
        .collection('Viajes')
        .updateOne(
            {_id: mongodb.ObjectID(idViaje)},
            {$set :
                {
                    'vehiculo' :vehiculo,
                }
        })
    }



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


module.exports = { getAllViajes, getViaje, getViajesDelDia, addViaje, putViaje, asignarClienteoVehiculoAviaje, deleteViaje }
