const express = require('express');
const solicitud = require('../models/solicitud_model');
const app = express();
app.use(express.urlencoded({ extended: true}));


const getSolicitudes = async (req, res) => {
  const arraySolicitudes = await  solicitud.find({}).exec();
  if(!arraySolicitudes||arraySolicitudes.length===0){ //si no existe o el arreglo esta vacio
    return res.status(404).json({
      status:"error",
      message:"no se encontraron clientes"
    })
  }
  return res.status(200).json({
    status:"success",
    arraySolicitudes
  })
}


const createSolicitud = async (req, res) => {
  try {
    // Extrae los datos del cuerpo de la solicitud
    const { fecha, cliente, nombre, plato_de_comida_1, cantidad_1 } = req.body;

    // Crea una nueva instancia con esos datos
    const nuevaSolicitud = new solicitud({
      fecha,
      cliente,
      nombre,
      plato_de_comida_1,
      cantidad_1
    });
    // Guarda en la base de datos
    await nuevaSolicitud.save();

    res.status(201).json({
      status: 'success',
      data: nuevaSolicitud,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'No se pudo crear la solicitud',
    });
  }
}

const deleteSolicitud = async (req, res) => {
  try {
    const solicitudId = req.params.solicitudId; // Obtiene el ID de la solicitud desde los parámetros de la URL

    // Busca y elimina la solicitud por su ID
    const result = await solicitud.findByIdAndRemove(solicitudId);

    if (result) {
      res.status(200).json({
        status: 'success',
        message: 'Solicitud eliminada correctamente',
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Solicitud no encontrada',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al eliminar la solicitud',
    });
  }
};

const updateSolicitud = async (req, res) => {
  try {
    const solicitudId = req.params.solicitudId; // Obtiene el ID de la solicitud desde los parámetros de la URL
    const { fecha, cliente, nombre, plato_de_comida_1, cantidad_1 } = req.body; // Obtiene los datos actualizados desde el cuerpo de la solicitud

    // Busca y actualiza la solicitud por su ID
    const updatedSolicitud = await solicitud.findByIdAndUpdate(
      solicitudId,
      { fecha, cliente, nombre, plato_de_comida_1, cantidad_1  },
      { new: true } // Esto asegura que se devuelva la solicitud actualizada
    );

    if (updatedSolicitud) {
      res.status(200).json({
        status: 'success',
        data: updatedSolicitud,
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Solicitud no encontrada',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al actualizar la solicitud',
    });
  }
};


  module.exports={
    getSolicitudes,
    createSolicitud,
    deleteSolicitud,
    updateSolicitud

  }

      
    