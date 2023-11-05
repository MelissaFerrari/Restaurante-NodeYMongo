const express =require ("express");
const router =express.Router();
const cliente = require("../controllers/clienteController");


router.get("/clientes",cliente.getClientes);
router.post("/clientes", cliente.createCliente);
router.delete('/clientes/:clienteId', cliente.deleteCliente);
router.put('/clientes/:clienteId', cliente.updateCliente);

module.exports=router;