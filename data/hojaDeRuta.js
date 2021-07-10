const axios = require('axios')
const { json } = require('express')
require('dotenv').config()

class Llamada {    
    constructor(ciudad) {
        this.ciudad= ciudad ? ciudad : 'Ciudad Autonoma de Buenos Aires'
        this.uri='http://api.openweathermap.org/data/2.5/weather?'+
            'q='+this.ciudad+',ar&APPID='+process.env.OPEN_WEATHER_API_KEY+'&lang=es'
    }
}

// Documentacion API
// https://openweathermap.org/current
// Que devuelve? Leer: Weather fields in API response


async function getClima(ciudadRecibida){
    try {
        var llamada = new Llamada(ciudadRecibida)
        
        const response = await axios.get(llamada.uri)
        
        return obtenerDatosNecesarios(response)

    } catch (error) {
        throw Error(error)
    }
}

async function getIconoClima(){
    try {

        // DECIDIR SI SE VA A MOSTRAR OTRO TIPO DE 
        // CLIMA SI SE LLAMA CON OTRA CIUDAD 
        const clima = await getClima(undefined)
        
        return clima.weather[0].icon
        
    } catch (error) {
        throw Error(error)
    }
}

function obtenerDatosNecesarios(respuesta) {
    
    return {
        weather:respuesta.data.weather,
        main:respuesta.data.main,
        clouds:respuesta.data.clouds,
        name:respuesta.data.name,
    }
}


async function obtenerCoordenadas(req) {
    try {
        let url = 'https://api.openrouteservice.org/geocode/search/structured?api_key='+process.env.ORS_API_KEY+
                    '&locality='+req.localidad+'&address='+ req.domicilioEntrega
        console.log(url)
        const response = await axios.get(url)
        return response.data
            
        } catch (error) {
            throw Error(error)
        }
}

//Devuelve un JSON (GEOJSON) integrar con openstreetmap 
async function calcularRuta(req){
    try {
        let url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson?api_key='+process.env.ORS_API_KEY
        
        const response = await axios.post(url, req)
          return response.data
        } catch (error) {
             throw Error(error)
        }
}

module.exports = {getClima, getIconoClima, calcularRuta, obtenerCoordenadas}