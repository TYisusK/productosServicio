var conexion = require("./conexion").conexionProductos;
var Producto = require("../model/producto");

// Mostrar todos los productos
async function mostrarProductos() {
    var productos = [];
    try {
        var datosProductos = await conexion.get();
        datosProductos.forEach(productoDoc => {
            var producto = new Producto(productoDoc.id, productoDoc.data());
            if (producto.bandera == 0) {
                productos.push(producto.obtenerDatos);
            }
        });
    } catch (err) {
        console.log("Error al recuperar productos de la BD: " + err);
    }
    return productos;
}

// Buscar producto por ID
async function buscarProductoPorID(id) {
    if (typeof id !== 'string' || id.trim() === '') {
        console.log("ID inválida: ", id);
        return null;
    }

    console.log("Firestore Path: ", `Path: productos/${id}`);

    var producto;
    try {
        var productoDoc = await conexion.doc(id).get();
        if (!productoDoc.exists) {
            console.log("Producto no encontrado por ID:", id);
            return null;
        }

        var productoObjeto = new Producto(productoDoc.id, productoDoc.data());
        if (productoObjeto.bandera == 0) {
            producto = productoObjeto.obtenerDatos;
        }
    } catch (err) {
        console.log("Error al recuperar el producto (Buscar por ID): " + err);
    }
    return producto;
}

// Agregar nuevo producto
async function nuevoProducto(datos) {
    var producto = new Producto(null, datos);
    var error = 1;
    if (producto.bandera == 0) {
        try {
            await conexion.doc().set(producto.obtenerDatos);
            console.log("Producto insertado a la BD");
            error = 0;
        } catch (err) {
            console.log("Error al capturar el nuevo producto: " + err);
        }
    }
    return error;
}

// Modificar producto existente
async function modificarProducto(datos) {
    var error = 1;
    var productoExistente = await buscarProductoPorID(datos.id);

    if (productoExistente !== undefined) {
        var producto = new Producto(datos.id, datos);

        if (producto.bandera == 0) {
            try {
                await conexion.doc(producto.id).set(producto.obtenerDatos);
                console.log("Producto actualizado");
                error = 0;
            } catch (err) {
                console.log("Error al modificar el producto: " + err);
            }
        }
    }

    return error;
}

// Borrar producto por ID
async function borrarProducto(id) {
    var error = 1;
    var producto = await buscarProductoPorID(id);
    if (producto != undefined) {
        try {
            await conexion.doc(id).delete();
            console.log("Producto borrado");
            error = 0;
        } catch (err) {
            console.log("Error al borrar el producto: " + err);
        }
    }
    return error;
}

module.exports = {
    mostrarProductos,
    buscarProductoPorID,
    nuevoProducto,
    modificarProducto,
    borrarProducto
};
