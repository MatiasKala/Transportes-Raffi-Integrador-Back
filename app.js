var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var choferesRouter = require('./routes/choferes');
var vehiculosRouter = require('./routes/vehiculos');
var clientesRouter = require('./routes/clientes');
var viajesRouter = require('./routes/viajes');
var hojaDeRutaRouter = require('./routes/hojaDeRuta');

var app = express(); 
app.use(cors())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/choferes', choferesRouter);
app.use('/vehiculos', vehiculosRouter);
app.use('/clientes', clientesRouter);
app.use('/viajes', viajesRouter);
app.use('/hojaDeRuta', hojaDeRutaRouter);
// app.use('/services', servicesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
