const {Schema,model} =require ('mongoose');

const clienteSchema = Schema({
    DNI:String,
    telefono:String,
    email:String,
    nombre_completo: String,

});


module.exports=model("cliente",clienteSchema,"cliente")
