const express =require ("express");
const router =express.Router();
const platos_de_comida= require("../controllers/platosController");


router.get("/platos-de-comida",platos_de_comida.getPlatosDeComida);
router.post("/platos-de-comida", platos_de_comida.createPlato);
router.delete('/platos-de-comida/:platoId', platos_de_comida.deletePlato);
router.put('/platos-de-comida/:platoId', platos_de_comida.updatePlato);


module.exports=router;