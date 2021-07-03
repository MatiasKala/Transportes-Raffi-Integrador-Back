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


    if(await findByCUIT(cliente.CUIT)){
        throw new Error('Ya existe un cliente registrado con el CUIT '+cliente.CUIT)
    }

    const connectiondb = await connection.getConnection()
    const result = await connectiondb.db('TransportesRaffi')
    .collection('Clientes')
    .insertOne(cliente)

    return result
}


async function putCliente(id,cliente){
    const connectiondb = await connection.getConnection()
    
    const oldCliente= await getCliente(id)

    if(!oldCliente){
        throw new Error(`No se encotro ningun Cliente con id ${id}`)       
    }

    if(cliente.CUIT && await findByCUIT(cliente.CUIT)){
        throw new Error('Ya existe un cliente registrado con el CUIT '+cliente.CUIT)
    }

    //Validar Parametros
    const result = await connectiondb.db('TransportesRaffi')
    .collection('Clientes')
    .update(
        {_id : mongodb.ObjectID(id)},
        {$set :
            {
                "CUIT" :cliente.CUIT ?? oldCliente.CUIT,
                "nombre" :cliente.nombre ?? oldCliente.nombre,
                "direccion" :cliente.direccion ?? oldCliente.direccion,  
                "tipoCobro" :cliente.tipoCobro ?? oldCliente.tipoCobro,  
            }
        })

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

async function findByCUIT(CUIT){
    const connectiondb = await connection.getConnection()

    const chofer = await connectiondb.db('TransportesRaffi')
    .collection('Clientes')
    .findOne({CUIT : CUIT})

    return chofer
}


module.exports = { getAllClientes, getCliente, addCliente, putCliente, deleteCliente, findByCUIT }