'use strict'

const express = require("express"),
      bodyParser = require("body-parser"),
      cookieSession = require("cookie-session"),
      methodOverride = require("method-override"),
      config = require('./config'),
      // controlador del inicio
      IndexController = require('./app_server/controllers/index'),
      // middlewares
      session_active = require('./app_server/middleware/session_active'),
      session_active_sucursal = require('./app_server/middleware/session_active_sucursal'),
      session_admin = require('./app_server/middleware/session_admin'),
      session_general_admin = require('./app_server/middleware/session_general_admin'),
      // rutes
      router_almacen = require('./app_server/routes/routes_almacen'),
      router_consumo = require('./app_server/routes/routes_consumo'),
      router_basico = require('./app_server/routes/routes_basico'),
      router_user = require('./app_server/routes/routes_user'),
      router_tecnica = require('./app_server/routes/routes_tecnica'),
      router_historial = require('./app_server/routes/routes_historial'),
      router_sucursal = require('./app_server/routes/routes_sucursal'),
      router_category = require('./app_server/routes/routes_category'),
      router_product = require('./app_server/routes/routes_product'),
      mongo = require('./app_server/models/connection'), // inicia la coneccion con mongodb
      app = express()

// configuraciones de express
app
    .set( 'port', config.PORT || 3000 )
    .use( "/src", express.static("src") )
    .use( bodyParser.json() )
    .use( bodyParser.urlencoded({extended:true}))
    .use( methodOverride("_method"))
    .use( cookieSession({
      name: "session",
      keys: ["gelish","time"],
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 año de session
    }))
    .set("view engine","pug")
    .set('views', './app_server/views')
// rutas de la raiz
app
    .get("/", IndexController.indexGet )
    .get("/logout", IndexController.logout )
    .get("/login", IndexController.loginGet )
    .post("/login", IndexController.loginPost )
// ----------------------------- Rutas -----------------------------------------//
// gelishtime/almacen
app
    .use("/almacen",session_active)
    .use("/almacen",router_almacen)
// gelishtime/consumos
app
    .use("/consumos",session_active)
    .use("/consumos",router_consumo)
// gelishtime/basicos
app
    .use("/basicos",session_active_sucursal)
    .use("/basicos",router_basico)
// gelishtime/users
app
    .use("/users",session_admin)
    .use("/users",router_user)
// gelishtime/tecnicas
app
    .use("/tecnicas",session_admin)
    .use("/tecnicas",router_tecnica)
// gelishtime/almacen
app
    .use("/historial",session_admin)
    .use("/historial",router_historial)
// gelishtime/sucursales
app
    .use("/sucursales",session_general_admin)
    .use("/sucursales",router_sucursal)
// gelishtime/categories
app
    .use("/categories",session_general_admin)
    .use("/categories",router_category)
// gelishtime/products
app
    .use("/products",session_general_admin)
    .use("/products",router_product)
// si ponen una ruta no existente, se redirecciona a almacen
app
    .use( IndexController.error404 )

module.exports = app

