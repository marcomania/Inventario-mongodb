'use strict'

const mongoose = require("mongoose"),
      Schema = mongoose.Schema,
      categoria_schema = new Schema({
          nombre: {
              type: String,
              require: true,
              maxlength: [50,"nombre de categoria muy largo"],
              unique: true,
              trim: true
          },
          descripcion:{
              type: String,
              require: true,
              maxlength: [50,"descripción de categoria muy grande"],
              default: "Sin descripción",
              trim: true
          }
      }),
      Categoria = mongoose.model("Categoria",categoria_schema)

module.exports = Categoria
