var admin=require("firebase-admin");
var keys=require("../keys.json");

admin.initializeApp({
    credential:admin.credential.cert(keys)
});
var bd=admin.firestore();
var conexionProductos=bd.collection("productos");

module.exports={
    conexionProductos
}