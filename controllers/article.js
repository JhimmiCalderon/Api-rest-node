const fs = require("fs");
const path = require("path");
const {validatearticle } = require("../helpers/validate");
const Article = require("../models/Article");
const { search } = require("../routes/article");


const test = ( req, res) => {

    return res.status(200).json({
        mensaje: "Soy una accion de prueba en mj controllador de articulos"
    })
}

const course = (req, res) => {
    console.log("Se a ejecutado el endpoint probando")

        //normalmente se devuleve una respuesta
    return res.status(200).json([{
        curso: "Master en react",
        autor: "Victor Robles"
    },

]);

};

    const create = async (req, res) => {
        // Recoger los parámetros a guardar
        let parametros = req.body;

        
      // Validar los datos
      try {
        await validatearticle(parametros);

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

        // Crear el objeto a guardar
        const article = new Article(parametros);

        try {
            // Guardar el artículo en la base de datos usando await
            const articlesave = await article.save();

            // Devolver resultado
            return res.status(200).json({
                status: "success",
                article: articlesave,
                mensaje: "¡Artículo creado con éxito!"
            });
        } catch (error) {
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha guardado el artículo"
            });
        }
    };

    // Listar Articulos
    const get = async (req, res) => {
        try {
            // Crear la consulta inicial para obtener todos los artículos
            let query = Article.find({});
    
            // Si el parámetro 'ultimos' existe, limitamos a los últimos 3 artículos
            if (req.params.ultimos) {
                query = query.limit(3);
            }
    
            // Ordenar los artículos por fecha en orden descendente
            query = query.sort({ fecha: -1 });
    
            // Ejecutar la consulta
            const articles = await query;
    
            // Comprobar si se encontraron artículos
            if (!articles || articles.length === 0) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "No se han encontrado artículos"
                });
            }
    
            // Devolver el resultado en caso de éxito
            return res.status(200).json({
                status: "success",
                contador: articles.length,
                articles
            });
        } catch (error) {
            // Manejar cualquier error de base de datos
            return res.status(500).json({
                status: "error",
                mensaje: "Error al consultar los artículos"
            });
        }
    };

    const one = async (req, res) => {
        try {
            // Recoger el ID de la URL
            const id = req.params.id;
    
            // Buscar el artículo por ID en la base de datos
            const article = await Article.findById(id);
    
            // Si el artículo no existe, devolver un error 404
            if (!article) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "No se ha encontrado el artículo"
                });
            }
    
            // Devolver el resultado en caso de éxito
            return res.status(200).json({
                status: "success",
                article
            });
        } catch (error) {
            // Manejar cualquier error en la base de datos
            return res.status(500).json({
                status: "error",
                mensaje: "Error al consultar el artículo"
            });
        }
    };
    

    const deleteArticle = async (req, res) => {
        try {
            // Recoge el id de la URL
            let article_id = req.params.id;
    
            // Buscar el artículo que vamos a borrar por Id en la BD
            const article = await Article.findOneAndDelete({ _id: article_id });
    
            // Si el artículo no existe, devolver un error 404
            if (!article) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "No se ha encontrado el artículo"
                });
            }
    
            // Devolver el resultado en caso de éxito
            return res.status(200).json({
                status: "success",
                article,
                mensaje: "Artículo eliminado con éxito"
            });
        } catch (error) {
            // Manejar cualquier error en la base de datos
            return res.status(500).json({
                status: "error",
                mensaje: "Error al eliminar el artículo"
            });
        }
    };

 
    const editarticle = async (req, res) => {
        try {
            // Recoger el id del artículo a editar
            let article_id = req.params.id;
    
            // Recoger datos del body
            let parametros = req.body;
    
            // Validar los datos
            try {
            await validatearticle(parametros);

        } catch (error) {
            return res.status(400).json({
                status: "error",
                mensaje: "Faltan datos por enviar"
            });
        }
    
            // Buscar y actualizar el artículo
            const article = await Article.findOneAndUpdate(
                { _id: article_id },  // Filtro para encontrar el artículo
                { $set: parametros },  // Datos a actualizar
                { new: true, runValidators: true }  // Opciones para que devuelva el artículo actualizado y valide
            );
    
            // Si el artículo no existe, devolver un error 404
            if (!article) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "No se ha encontrado el artículo"
                });
            }
    
            // Devolver el resultado en caso de éxito
            return res.status(200).json({
                status: "success",
                article,
                mensaje: "Artículo editado con éxito"
            });
        } catch (error) {
            // Manejar cualquier error en la base de datos
            return res.status(500).json({
                status: "error",
                mensaje: "Error al editar el artículo"
            });
        }
    };

  

    const upload = async (req, res) => { //para subir imagen


        // Configurar multer (Route)

        // Recoger el fichero de img subido
        if(!req.file && !req.file){
            return res.status(404).json({
                status: "error",
                mensaje: "peticion invalida"
            })
        }
    
        // Nombre del archivo
        let namefile = req.file.originalname;
    
        // Extension del archivo
        let file_split = namefile.split(".");
        let file_extension = file_split[1].toLowerCase(); // Convertir a minúsculas para evitar problemas de mayúsculas
    
        // Comprobar extensión correcta
        if (file_extension != "png" && file_extension != "jpg" && 
            file_extension != "jpeg" && file_extension != "gif") {
            
            // Borrar archivo y dar respuesta (usar  libreria fs)
            fs.unlink(req.file.path, (error) => {
                return res.status(400).json({
                    status: "error",
                    mensaje: "Imagen Invalida"
                });
            });
        } else {
            // Si todo va bien, actualizar el artículo

                try{
                // Recoger el id del artículo a editar
                let article_id = req.params.id;
        
        
                // Buscar y actualizar el artículo
                const article = await Article.findOneAndUpdate(
                    { _id: article_id },  // Filtro para encontrar el artículo
                    { imagen: req.file.filename},  // Datos a actualizar
                    { new: true, runValidators: true }  // Opciones para que devuelva el artículo actualizado y valide
                );
        
                // Si el artículo no existe, devolver un error 404
                if (!article) {
                    return res.status(404).json({
                        status: "error",
                        mensaje: "No se ha encontrado el artículo"
                    });
                }
        
                // Devolver el resultado en caso de éxito
                return res.status(200).json({
                    status: "success",
                    article,
                    fichero: req.file,
                    mensaje: "Artículo editado con éxito"
                });
            } catch (error) {
                // Manejar cualquier error en la base de datos
                return res.status(500).json({
                    status: "error",
                    mensaje: "Error al editar el artículo"
                });
            }

        }
    };
    
    const image = async (req, res) => {
        let fichero = req.params.fichero; // Obtener el nombre del archivo desde los parámetros de la URL
        let ruta_fisica = "./img/articulos/" + fichero; // Construir la ruta física del archivo
    
        fs.stat(ruta_fisica, (error, existe) => { // Verificar la existencia del archivo
            if (existe) { // Si el archivo existe
                return res.sendFile(path.resolve(ruta_fisica)); // Enviar el archivo como respuesta
            } else { // Si el archivo no existe
                return res.status(404).json({ // Devolver un error 404
                    status: "error",
                    mensaje: "La imagen no existe",
                    existe, // Información sobre la existencia del archivo (debe ser false si no existe)
                    fichero, // Nombre del archivo solicitado
                    ruta_fisica // Ruta física que se intentó acceder
                });
            }
        });
    }

    const searchimg = async (req, res) => {
        try {
            // Sacar el string
            let busqueda = req.params.busqueda;
    
            // Buscar artículos que coincidan con la búsqueda
            const articulosEncontrados = await Article.find({
                "$or": [
                    { "titulo": { "$regex": busqueda, "$options": "i" } },
                    { "contenido": { "$regex": busqueda, "$options": "i" } },
                ]
            })
            .sort({ fecha: -1 }) // Ordenar por fecha en orden descendente
    
            // Comprobar si se encontraron artículos
            if (!articulosEncontrados || articulosEncontrados.length === 0) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "No se encontraron artículos"
                });
            }
    
            // Devolver los resultados en caso de éxito
            return res.status(200).json({
                status: "success",
                articles: articulosEncontrados // Usar la variable correcta
            });
    
        } catch (error) {
            // Manejar errores
            return res.status(500).json({
                status: "error",
                mensaje: "Error en la búsqueda de artículos",
            });
        }
    }
    


module.exports = {
    test,
    course,
    create,
    get,
    one,
    deleteArticle,
    editarticle,
    upload,
    image,
    searchimg

}