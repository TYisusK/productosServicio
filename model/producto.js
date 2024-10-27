class Usuario{
    constructor(id, data){
       
        this.bandera=0;
        this.id=id;
        this.nombre=data.nombre;
        this.descripcion=data.descripcion;
        this.stock=data.stock;
        this.tipoProducto=data.tipoProducto;
        this.foto=data.foto;
        
       
    }
    set id(id){
        if(id!=null)
            id.length>0?this._id=id:this.bandera=1;
    }
    set nombre(nombre){
        nombre.length>0?this._nombre=nombre:this.bandera=1;
        
    }
    set descripcion(descripcion){
        this._descripcion=descripcion;
        
    }
    set stock(stock){
        this._stock=stock;
        
    }
    set foto(foto){
        this._foto=foto;
    }
   set tipoProducto(tipoProducto){
        this._tipoProducto=tipoProducto;
    }
       
  
    
    get id(){
        return this._id;
    }
    get nombre(){
        return this._nombre;
    }
    get descripcion(){
        return this._descripcion;
    }
    get stock(){
        return this._stock;
    }
    get tipoProducto(){
        return this._tipoProducto;
    }
    get foto(){
        return this._foto;
    }

    get obtenerDatos(){
        if(this._id!=null)
            return {
                id:this.id,
                nombre:this.nombre,
                descripcion:this.descripcion,
                stock:this.stock,
                tipoProducto:this.tipoProducto,
                foto:this.foto,
                
            }
        else{
            return {
                nombre:this.nombre,
                descripcion:this.descripcion,
                stock:this.stock,
                tipoProducto:this.tipoProducto,
                foto:this.foto,
             
            }
        }
    }
}
module.exports=Usuario;