const connection = require('./connection')
const mongodb = require('mongodb')
const getChofer = require('../data/choferes').getChofer
const asignarVehiculoAchofer = require('../data/choferes').asignarVehiculoAchofer

async function getAllVehiculos(){
    const connectiondb = await connection.getConnection()
    const vehiculos = await connectiondb.db('TransportesRaffi')
    .collection('Vehiculos')
    .find()
    .toArray()
  
    return vehiculos
}

async function getVehiculo(id){
    const connectiondb = await connection.getConnection()
    const vehiculo  = await connectiondb.db('TransportesRaffi')
    .collection('Vehiculos')
    .findOne({_id : mongodb.ObjectID(id)})
  
    return vehiculo
}

async function getVehiculoByPatente(patente){
    const connectiondb = await connection.getConnection()
    const vehiculo  = await connectiondb.db('TransportesRaffi')
    .collection('Vehiculos')
    .findOne({patente :patente})
  
    return vehiculo
}

async function addVehiculo(vehiculo){
    const connectiondb = await connection.getConnection()
    // VALIDAR TIPO Y CHOFER
    vehiculo.viajesAsignados = []
    vehiculo.chofer = {}
    const result = await connectiondb.db('TransportesRaffi')
    .collection('Vehiculos')
    .insertOne(vehiculo)

    return result
}

async function asignarViajeVehiculo(patente,viaje) { 
    const vehiculo= await getVehiculo(patente)

    if(!vehiculo){
        throw new Error(`No se encontro ningun vehiculo con patente ${patente}`)        
    }
    //Validar Viaje
    vehiculo.viajesAsignados.push(viaje)

    return true
}


async function asignarChoferAvehiculo(patente,idChofer) { 
    
    console.log('LLEGUE AL DATA ');

    console.log(patente,'\n',idChofer);

    let vehiculo= await getVehiculoByPatente(patente)

    if(!vehiculo){
        throw new Error(`No se encontro ningun vehiculo con patente ${patente}`)      
    }
    //Validar Chofer

    const chofer = await getChofer(idChofer)

    if(!chofer){
        throw new Error(`No se encontro ningun chofer con id ${idChofer}`)      
    }
        
    vehiculo.chofer = chofer 

    await asignarVehiculoAchofer(vehiculo,chofer)
    
    const connectiondb = await connection.getConnection()

    const result = await connectiondb.db('TransportesRaffi')
    .collection('Vehiculos')
    .updateOne(
        {patente : patente},
        {$set :
            {
                "chofer" :chofer,
            }
    })
    
    return result
}

async function putVehiculo(id,vehiculo){
    const connectiondb = await connection.getConnection()
    
    const oldVehiculo= await getVehiculo(id)

    if(!oldVehiculo){
        throw new Error(`No se encotro ningun vehiculo con id ${id}`)       
    }
    //Validar Parametros
    const result = await connectiondb.db('TransportesRaffi')
    .collection('Vehiculos')
    .update(
        {_id : mongodb.ObjectID(id)},
        {$set :
            {
                "patente" :vehiculo.patente ?? oldVehiculo.patente,
                "marca" :vehiculo.marca ?? oldVehiculo.marca,
                "modelo" :vehiculo.modelo ?? oldVehiculo.modelo,  
                "anio" :vehiculo.anio ?? oldVehiculo.anio,  
                "seguro" :vehiculo.seguro ?? oldVehiculo.seguro,  
                "tipo" :vehiculo.tipo ?? oldVehiculo.tipo,  
            }
        })

    return result

}


async function deleteVehiculo(id) {
    const vehiculo = await getVehiculo(id)
    
    if(!vehiculo){
        throw new Error(`No se encotro ningun vehiculo con id ${id}`)
    }

    const connectiondb = await connection.getConnection()
    
    const result = connectiondb.db('TransportesRaffi')
    .collection('Vehiculos')
    .deleteOne({_id : mongodb.ObjectID(id)})


    return result
}

async function findByPatente(patente){
    const connectiondb = await connection.getConnection()

    const vehiculo = await connectiondb.db('TransportesRaffi')
    .collection('Vehiculos')
    .findOne({patente : patente})

    if(!vehiculo){
        throw new Error(`No se encotro ningun vehiculo con patente ${patente}`)
    }

    return vehiculo;
}

module.exports = { getAllVehiculos,getVehiculo,addVehiculo,putVehiculo,deleteVehiculo,asignarChoferAvehiculo,asignarViajeVehiculo,findByPatente}