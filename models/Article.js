const { Schema, model } = require("mongoose");

//Estructura que va a tener mi modelo

const ArticleSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido:{
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    imagen: {
        type: String,
        default: "default.png"
    }
});

module.exports = model("Article", ArticleSchema, "articles");