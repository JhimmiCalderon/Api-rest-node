const {connection} = require ("./database/connection")
const express = require("express");
const cors = require("cors");

// inicializar app
console.log("App de node  Corriendo")

// Conectar a la base de  datos
connection();

// crear Servido Node
const app = express();
const port = 3000;

// Configurar cors
app.use(cors()); //usar midelware se ejecuta antes de otras csoas

// convertir body a objeto js
app.use(express.json());//recibir datos con content-type app/json
app.use(express.urlencoded({extended:true}));// recibiendo datos por form-urlencoded 


// RUTAS
const routes_article = require("./routes/article");

// Cargo las rutas
app.use("/api", routes_article);

// Rutas pruebas hardcodeadas
app.get("/probando", (req, res) => {
    console.log("Se a ejecutado el endpoint probando")

        //normalmente se devuleve una respuesta
    return res.status(200).json([{
        curso: "Master en react",
        autor: "Victor Robles"
    },

]);

});
app.get("/", (req, res) => {
    
    return res.status(200).send(
        "<h1>Empezando a crear un api con node</h1>"
    );

});

// Crear servidor y escuchar petticiones http
app.listen(port, () => {
    console.log("Servidor corriendo en el servidor " + port);
});