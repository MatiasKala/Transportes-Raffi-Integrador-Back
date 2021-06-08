const connection = require('./connection')
const mongodb = require('mongodb')
const { getCliente } = require('./clientes')
const { getVehiculo } = require('./vehiculos')
// const getChofer = require('./choferes').getChofer


async function getAllViajes(){
    const connectiondb = await connection.getConnection()
    const viajes = await connectiondb.db('TransportesRaffi')
    .collection('Viajes')
    .find()
    .toArray()
  
    return vehiculos
}

async function getViajes(id){
    const connectiondb = await connection.getConnection()
    const vehiculo  = await connectiondb.db('TransportesRaffi')
    .collection('Viajes')
    .findOne({_id : mongodb.ObjectID(id)})
  
    return vehiculo
}

// async function getVehiculoByPatente(patente){
//     const connectiondb = await connection.getConnection()
//     const vehiculo  = await connectiondb.db('TransportesRaffi')
//     .collection('Vehiculos')
//     .findOne({patente :patente})
  
//     return vehiculo
// }

async function addViaje(viaje){
    const vehiculo = await getVehiculo(patente)
    const cliente = await getCliente(idCliente)

    if(!vehiculo){
         throw new Error(`No se encontro ningun vehiculo con patente ${patente}`)        
     }

    if(!cliente){
        throw new Error(`No se encontro ningun cliente con id ${idCliente}`)        
    }

    viaje.vehiculo = vehiculo
    viaje.cliente = cliente


    const connectiondb = await connection.getConnection()
    const result = await connectiondb.db('TransportesRaffi')
    .collection('Viajes')
    .insertOne(viaje)

    return result
}

// async function asignarViajeVehiculo(patente,viaje) { 
//     const vehiculo= await getVehiculo(patente)

//     if(!vehiculo){
//         throw new Error(`No se encontro ningun vehiculo con patente ${patente}`)        
//     }
//     //Validar Viaje
//     vehiculo.viajesAsignados.push(viaje)

//     return true
// }


// async function asignarChoferVehiculo(patente,idChofer) { 
    
//     const vehiculo= await getVehiculoByPatente(patente)

//     if(!vehiculo){
//         throw new Error(`No se encontro ningun vehiculo con patente ${patente}`)      
//     }
//     //Validar Chofer

//     const chofer = await getChofer(idChofer)

//     if(!chofer){
//         throw new Error(`No se encontro ningun chofer con id ${idChofer}`)      
//     }

//     const connectiondb = await connection.getConnection()

//     const result = await connectiondb.db('TransportesRaffi')
//     .collection('Vehiculos')
//     .update(
//         {patente : patente},
//         {$set :
//             {
//                 "chofer" :chofer,
//             }
//         })
    
//     // Hacer la asignacion del Chofer al vehiculo (al revés)

//     return result
// }

async function putViaje(id,viaje){
    const connectiondb = await connection.getConnection()
    
    const oldViaje = await getViaje(id)

    if(!oldViaje){
        throw new Error(`No se encotro ningun viaje con id ${id}`)       
    }
    //Validar Parametros
    // const result = await connectiondb.db('TransportesRaffi')
    // .collection('Viajes')
    // .update(
    //     {_id : mongodb.ObjectID(id)},
    //     {$set :
    //         {
    //             "patente" :vehiculo.patente ?? oldVehiculo.patente,
    //             "marca" :vehiculo.marca ?? oldVehiculo.marca,
    //             "modelo" :vehiculo.modelo ?? oldVehiculo.modelo,  
    //             "anio" :vehiculo.anio ?? oldVehiculo.anio,  
    //             "seguro" :vehiculo.seguro ?? oldVehiculo.seguro,  
    //             "tipo" :vehiculo.tipo ?? oldVehiculo.tipo,  
    //         }
    //     })

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

// async function findByPatente(patente){
//     const connectiondb = await connection.getConnection()

//     const vehiculo = await connectiondb.db('TransportesRaffi')
//     .collection('Vehiculos')
//     .findOne({patente : patente})

//     if(!vehiculo){
//         throw new Error(`No se encotro ningun vehiculo con patente ${patente}`)
//     }

//     return vehiculo;
// }

module.exports = { getAllViajes, getViajes, addViaje, putViaje, deleteViaje }
    // asignarChoferVehiculo,asignarViajeVehiculo,findByPatente}