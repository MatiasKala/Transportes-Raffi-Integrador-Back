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


async function getClimaBuenosAires(ciudadRecibida){
    try {

        var llamada = new Llamada(ciudadRecibida)
        
        const response = await axios.get(llamada.uri)
        
        return obtenerDatosNecesarios(response)

    } catch (error) {
        throw Error(error)
    }
}

function obtenerDatosNecesarios(respuesta) {
    

    data.weather = respuesta.data.weather
    data.main = respuesta.data.main
    data.clouds = respuesta.data.clouds
    data.rain = respuesta.data.rain
    data.name = respuesta.data.name

    return data
}


async function obtenerCoordenadas(req) {
    try {
        let url = 'https://api.openrouteservice.org/geocode/search/structured?api_key='+process.env.ORS_API_KEY+
                    '&locality='+req.localidad+'&address='+ req.direccion
        console.log(url)
        const response = await axios.get(url)
        return response.data
            
        } catch (error) {
            throw Error(error)
        }
}


async function calcularRuta(req){
    try {
        let url = 'https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248842afa0364db44e0bb4e07b8a08911e4'
        
        const response = await axios.post(url, req)
          return response.data
        } catch (error) {
             throw Error(error)
        }
}

module.exports = {getClimaBuenosAires, calcularRuta, obtenerCoordenadas}