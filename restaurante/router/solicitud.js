const express =require ("express");
const router =express.Router();
const solicitud = require("../controllers/solicitudController");


router.get("/solicitudes", solicitud.getSolicitudes);
router.post("/solicitudes", solicitud.createSolicitud);
router.delete('/solicitudes/:solicitudId', solicitud.deleteSolicitud);
router.put('/solicitudes/:solicitudId', solicitud.updateSolicitud);

module.exports=router;