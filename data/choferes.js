const connection = require('./connection')
const mongodb = require('mongodb')


async function getAllChoferes(){
    const connectiondb = await connection.getConnection()
    const choferes = await connectiondb.db('TransportesRaffi')
    .collection('Choferes')
    .find()
    .toArray()
  
    return choferes
}

async function getChofer(id){
    const connectiondb = await connection.getConnection()
    const chofer = await connectiondb.db('TransportesRaffi')
    .collection('Choferes')
    .findOne({_id : mongodb.ObjectID(id)})
  
    return chofer
}

async function addChofer(chofer){
    const connectiondb = await connection.getConnection()
    chofer.vehiculosAsignados = []
    const result = await connectiondb.db('TransportesRaffi')
    .collection('Choferes')
    .insertOne(chofer)

    return result
}

async function asignarVehiculoAchofer(vehiculo,chofer) {
    //Ya se validaron los parametros en el metodo que viene 
    //desde vehículo
    try {

        console.log('Llegue a Asignar Vehiculo de dataChoferes');

        console.log('Vehiculos asignados actuales',chofer.vehiculosAsignados);

        const newVehiculos = chofer.vehiculosAsignados         

        newVehiculos.push(vehiculo)
           
        console.log('Array a asignar ',newVehiculos);

        const connectiondb = await connection.getConnection()

        const result = await connectiondb.db('TransportesRaffi')
        .collection('Choferes')
        .updateOne(
            {_id : mongodb.ObjectID(chofer._id)}, // Encuentra la entidad a mofidicar,
            {$set :
                {
                    "vehiculosAsignados" : newVehiculos,
                }
            })
        
        return result

    } catch (error) {
        console.error('Error en la asignacion del Vehiculo al chofer\n',error);
    }
}

async function putChofer(id,chofer){
    const connectiondb = await connection.getConnection()
    
    const oldChofer= await getChofer(id)

    if(!oldChofer){
        throw new Error(`No se encotro ningun chofer con id ${id}`)        
    }
    //Validar Parametros
    const result = await connectiondb.db('TransportesRaffi')
    .collection('Choferes')
    .update(
        {_id : mongodb.ObjectID(id)},
        {$set :
            {
                "CUIT" :chofer.CUIT ?? oldChofer.CUIT,
                "nombre" :chofer.nombre ?? oldChofer.nombre,
                "apellido" :chofer.apellido ?? oldChofer.apellido,  
                "fechaNacimiento" :chofer.fechaNacimiento ?? oldChofer.fechaNacimiento,  
                "comision" :chofer.comision ?? oldChofer.comision,  
            }
    })

    return result

}


async function deleteChofer(id) {
    const chofer = await getChofer(id)
    
    if(!chofer){
        throw new Error(`No se encotro ningun chofer con id ${id}`)
    }

    const connectiondb = await connection.getConnection()
    
    const result = connectiondb.db('TransportesRaffi')
    .collection('Choferes')
    .deleteOne({_id : mongodb.ObjectID(id)})


    return result
}

async function findByCUIT(CUIT){
    const connectiondb = await connection.getConnection()

    const chofer = await connectiondb.db('TransportesRaffi')
    .collection('Choferes')
    .findOne({CUIT : CUIT})

    if(!chofer){
        throw new Error(`No se encotro ningun chofer con CUIT ${CUIT}`)
    }

    return chofer
}

module.exports = { getAllChoferes, getChofer, addChofer,asignarVehiculoAchofer , putChofer,deleteChofer, findByCUIT }