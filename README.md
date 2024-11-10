# API REST con Node.js

Este proyecto es una API RESTful construida con **Node.js** y **Express**, diseñada para manejar publicaciones de un blog. Permite realizar operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar) y soporta la carga de imágenes asociadas a las publicaciones.

## Descripción

Esta API permite gestionar un blog donde puedes **crear**, **leer**, **actualizar** y **eliminar** publicaciones. Además, ofrece soporte para la carga de imágenes y permite realizar búsquedas en las publicaciones.

## Dependencias

### Librerías principales

- **cors**: Middleware para habilitar solicitudes desde diferentes orígenes (CORS).
- **express**: Framework minimalista para crear aplicaciones web y APIs en Node.js.
- **mongoose**: ODM (Object Data Modeling) para MongoDB, utilizado para interactuar con la base de datos.
- **multer**: Middleware para manejar la carga de archivos, como imágenes.
- **validator**: Biblioteca para validar y sanitizar cadenas de texto.

### Dependencias de desarrollo

- **nodemon**: Herramienta para desarrollar de manera más eficiente, reiniciando automáticamente el servidor cuando detecta cambios en el código fuente.
