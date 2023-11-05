const {Schema,model} =require ('mongoose');

const solicitudSchema = Schema({
    fecha:String,
    cliente:String,
    nombre:String,
    plato_de_comida_1: String,
    cantidad_1: String

});


module.exports=model("solicitud",solicitudSchema,"solicitud")