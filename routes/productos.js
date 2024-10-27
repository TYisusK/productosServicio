var ruta = require("express").Router(); 
var subirArchivo = require("../middlewares/subirArchivo");
var { mostrarProductos, buscarProductoPorID, modificarProducto, borrarProducto, nuevoProducto } = require("../database/productos");


ruta.get("/altaProductos", async (req, res) => {
    res.render("altaProducto");
});

// Ruta para crear un nuevo producto
ruta.post("/nuevoProducto", subirArchivo(), async (req, res) => {
    console.log("Datos recibidos para nuevo producto:", req.body);
    console.log("Archivo recibido:", req.file);

    // Asignar el nombre del archivo subido, si existe
    if (req.file) {
        req.body.foto = req.file.originalname;
    } else {
        console.error("Archivo no subido");
    }

    try {
        const error = await nuevoProducto(req.body);
        if (error) {
            console.error('Error al crear nuevo producto:', error);
            return res.redirect("/productos/almacen"); // Redirigir a la página de almacenamiento en caso de error
        }

        res.redirect("/productos/almacen"); // Redirigir a la página de almacenamiento en caso de éxito
    } catch (err) {
        console.error("Error inesperado al crear el producto:", err);
        res.status(500).send("Error al crear el producto");
    }
});


// Ruta para mostrar todos los productos
ruta.get("/almacen", async (req, res) => {
    var productos = await mostrarProductos();
    res.render("almacen", { productos });
});

// Ruta para editar un producto
ruta.get("/editar/:id", async (req, res) => {
    var product = await buscarProductoPorID(req.params.id);
    res.render("editarProducto", { product });
});

// Ruta para actualizar un producto
ruta.post("/editar", subirArchivo(), async (req, res) => {
    console.log("Datos recibidos para edición:", req.body);
    console.log("Archivo recibido:", req.file);

    // Verificar si se subió un nuevo archivo; si no, mantener el archivo anterior
    if (req.file) {
        req.body.foto = req.file.originalname;
    } else {
        req.body.foto = req.body.fotoVieja;
    }

    try {
        const error = await modificarProducto(req.body);
        if (error) {
            console.error('Error al modificar producto:', error);
            return res.redirect(`/productos/editar/${req.body.id}`); // Redirigir a la página de edición en caso de error
        }

        res.redirect("/productos/almacen"); // Redirigir a la lista de productos después de una modificación exitosa
    } catch (err) {
        console.error("Error inesperado al modificar el producto:", err);
        res.status(500).send("Error al modificar el producto");
    }
});


// Ruta para borrar un producto
ruta.get("/borrar/:id", async (req, res) => {
    await borrarProducto(req.params.id);
    res.redirect("/productos/almacen");
});

module.exports = ruta;
