~~Breve descripción (no más de 5 lineas) del proyecto y lo que apunta resolver.
Listado de funcionalidades (casos de uso)
Listado de actores/roles 
Listado de las entidades principales
Instrucciones técnicas:
    - Para la instalación de un entorno de desarrollo
    - Para la ejecución
Listado de los endpoints de la API~~ 

# Transportes Raffi
## Descripcion del proyecto
***El proyecto expone los endpoints de backend de un sistema de gestion de transporte de paqueteria. 
El objetivo es dar respuesta a la necesidad de un Cliente de proveer un mecanismo para enviar un paquete, para ello cuenta con interfaces de alta de Clientes, Chofer, Viajes.***

## Funcionalidades
* CRUD de Usuario
* CRUD de Chofer
* CRUD de Cliente
* CRUD de Viajes
* Gestion de Hoja de Ruta
  * Consulta de Clima/Pronostico
  * Consulta de ruta
  * Actualizacion de Estado de viajes
* Filtrado de Viajes por datos

## Actores/Roles
* Administrador
* Observador

## Entidades
* Usuario
* Cliente
* Vehiculo
* Chofer
* Viaje

## Instalación

Usar el gestor de paquetes npm para instalar la aplicación.

```bash
npm install
```

## Ejecución
1. npm run para correr
```bash
npm run
```
2. npm run startDev para correr con Nodemon (si esta instalado)

```bash
npm run startDev
```
## License
[MIT](https://choosealicense.com/licenses/mit/)

## API endpoints
### /usuarios
Estos endpoints corresponden a la gestión de USUARIOS de la aplicación.

#### GET
`Obtener Usuarios` [/usuarios]<br/>
`Obtener Usuario` [/usuarios/:id]<br/>

#### POST
`Agregar Usuarios` [/usuarios]<br/>
`Login` [/usuarios/login]<br/>

#### PUT
`Modificar Usuario` [/usuarios/:id]<br/>

#### DELETE
`Eliminar Usuario` [/usuarios/:id]


### /vehiculos
Estos endpoints corresponden a la gestión de VEHICULOS de la aplicación.

#### GET
`Obtener Vehiculos` [/vehiculos]<br/>
`Obtener Vehiculo` [/vehiculos/:id]<br/>

#### POST
`Agregar Vehiculos` [/vehiculos]<br/>

#### PUT
`Modificar Vehiculo` [/vehiculos/:id]<br/>
`Asignar Chofer a Vehiculo` [/vehiculos/:patente/:idChofer]<br/>

#### DELETE
`Eliminar Vehiculo` [/vehiculos/:id]


### /
Estos endpoints corresponden a la gestión de CHOFERES de la aplicación.

#### GET
`Obtener Choferes` [/choferes]<br/>
`Obtener Chofer` [/choferes/:id]<br/>

#### POST
`Agregar Choferes` [/choferes]<br/>

#### PUT
`Modificar Chofer` [/choferes/:id]<br/>

#### DELETE
`Eliminar Chofer` [/choferes/:id]

### /
Estos endpoints corresponden a la gestión de CLIENTES de la aplicación.

#### GET
`Obtener Clientes` [/clientes]<br/>
`Obtener Cliente` [/clientes/:id]<br/>

#### POST
`Agregar Clientes` [/clientes]<br/>

#### PUT
`Modificar Cliente` [/clientes/:id]<br/>

#### DELETE
`Eliminar Cliente` [/clientes/:id]

### /
Estos endpoints corresponden a la gestión de VIAJES de la aplicación.

#### GET
`Obtener Viajes` [/viajes]<br/>
`Obtener Viaje` [/viajes/:id]<br/>

#### POST
`Agregar Viajes` [/viajes]<br/>

#### PUT
`Modificar Viaje` [/viajes/:id]<br/>

#### DELETE
`Eliminar Viaje` [/viajes/:id]




