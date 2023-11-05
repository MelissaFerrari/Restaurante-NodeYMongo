const {conexion}=require ("./conexion");
const express= require ("express");
const cors = require('cors'); // Importa cors


const app=express();
const puerto=3900;

//llama a la conexion con la base de datos
conexion();

app.use(cors());
app.use(express.json());
const rutas_platos=require("./router/platos_de_comida");
const rutas_clientes=require("./router/cliente");
const rutas_solicitudes=require("./router/solicitud");


app.use("/",rutas_platos);
app.use("/",rutas_clientes);
app.use("/",rutas_solicitudes);


//inicia el servidor

app.listen(puerto,()=>{
    console.log("servidor corriendo en el puerto" + puerto);
})