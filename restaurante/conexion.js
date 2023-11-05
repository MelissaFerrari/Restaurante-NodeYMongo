const mongoose = require('mongoose');

module.exports = mongoose;


//mongoose.connect(url)
  //.then(() => console.log('conectado a mongodb'))
  //.catch(e => console.log('error de conexion:', e))


const conexion =async ()=>{
  try{
    await mongoose.connect("mongodb://127.0.0.1:27017/Restaurante");
    console.log("conectado a la base de datos mongo" );
  }
  catch(error){
    console.log(error);
    throw new error("no se ha podido conectar a la base de datos");
  }
}

module.exports = {
  conexion
}