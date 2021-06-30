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
    
    if(await findByCUIT(chofer.CUIT)){
        throw new Error('Ya existe un chofer registrado con el CUIT ',chofer.CUIT)
    }

    const connectiondb = await connection.getConnection()
    
    const result = await connectiondb.db('TransportesRaffi')
    .collection('Choferes')
    .insertOne(chofer)

    return result
}


async function putChofer(id,chofer){

    if(chofer.CUIT && await findByCUIT(chofer.CUIT)){
        throw new Error('Ya existe un chofer registrado con el CUIT '+chofer.CUIT)
    }

    const oldChofer= await getChofer(id)

    if(!oldChofer){
        throw new Error(`No se encotro ningun chofer con id ${id}`)        
    }

    const connectiondb = await connection.getConnection()
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

    return chofer
}

module.exports = { getAllChoferes, getChofer, addChofer , putChofer,deleteChofer, findByCUIT }