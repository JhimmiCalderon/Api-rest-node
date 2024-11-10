// Importar o requerir mi mongoose para que me permita conectar mediante sus metodo a mi Bd
const mongoose = require("mongoose");

//creamos un metodo que nos permita conectar
const connection = async() => { //funcion asincrona
    try{//coexion

        //metodo de mongoose
        await mongoose.connect("mongodb://localhost:27017/mi_blog");

        //Parametro dentro de objeto //Solo en caso de aviso
        //useNewUrlParse: true
        //useUnifiedTopoLogy: true
        //useCreateIndex: true

        console.log("Conectado correctamente a la BD mi_blog!! ")

    }catch(error) { //capturo posibe error
        console.log(error)
        throw new Error ("No se ha podido conectar a la base de datos")//exepcion:evento que ocurre durante la ejecución de un programa y que interrumpe el flujo normal de instrucciones
    }
}

module.exports ={
    connection
}