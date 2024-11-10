// Voy a tener mi rutas definidas
 const express = require("express");
 const multer = require("multer");
 const ArticleController = require("../controllers/article");

 const router = express.Router();

 // paea indicar donde quiero guardar mis archivos
 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './img/articulos/'); //donde subir los artchivos
    },
//conseguir el nombre que va a tener cada archivo
    filename: (req, file, cb) => {
        cb(null, "articulo_" + Date.now() + file.originalname)
    }
 })

// le decimos a multer que este es el almacenamiento 
 const goup = multer({storage: storage})

 

 // Rutas de prueba
 router.get("/ruta-de-prueba",ArticleController.test);
 router.get("/course",ArticleController.course);

// Ruta Util
router.post("/crear", ArticleController.create);
router.get("/articulos/:ultimos?", ArticleController.get);
router.get("/articulo/:id",ArticleController.one);
router.delete("/articulo/:id", ArticleController.deleteArticle);
router.put("/articulo/:id", ArticleController.editarticle);
router.post("/subir-imagen/:id", goup.single("file0"), ArticleController.upload);
router.get("/imagen/:fichero", ArticleController.image);
router.get("/buscar/:busqueda", ArticleController.searchimg);


 module.exports = router;