require('dotenv').config()
const mongoclient = require('mongodb').MongoClient;
// TODO utilizar varibales de entorno

const uri = process.env.MONGO_URI

const client = new mongoclient(uri);

let instance = null;

async function getConnection(){
    if(instance == null){
        try {
            instance = await client.connect();
        } catch (err) {
            console.log(err.message);
            throw new Error('problemas al conectarse con mongo');
        }
    }
    return instance;
}

module.exports = {getConnection};