const {Schema,model} =require ('mongoose');
//const mongoose = require('mongoose');

//const platoSchema = new mongoose.Schema({
    const platoSchema= Schema({
    nombre: String,
    descripcion: String,
    ingredientes: String,
    precio: Number,
    apto_para_celiacos: Boolean,
    apto_para_veganos: Boolean,
    apto_para_diabeticos: Boolean,
    calorias: Number,
    imagen: String
});

//Crear el modelos
//const platos_de_comida = mongoose.model('platos_de_comida', platoSchema,"platos_de_comida");

//module.exports = platos_de_comida;
module.exports=model("platos_de_comida",platoSchema,"platos_de_comida")
//igual a lo del profe