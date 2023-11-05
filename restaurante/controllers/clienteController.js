const express = require('express');
const cliente = require('../models/cliente_model');
const app = express();
app.use(express.urlencoded({ extended: true}));



const getClientes =async (req, res) => {
  const arrayClientes = await  cliente.find({}).exec();
  if(!arrayClientes||arrayClientes.length===0){
    return res.status(404).json({
      status:"error",
      message:"no se encontraron clientes"
    })
  }
  return res.status(200).json({
    status:"success",
    arrayClientes
  })
}

const createCliente = async (req, res) => {
  try {
    const { DNI, telefono, email, nombre_completo } = req.body;

    const nuevoCliente = new cliente({
      DNI,
      telefono,
      email,
      nombre_completo
    });

    await nuevoCliente.save();

    res.status(201).json({
      status: 'success',
      data: nuevoCliente,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'No se pudo crear el cliente',
    });
  }
}

const deleteCliente = async (req, res) => {
  try {
    const clienteId = req.params.clienteId;
    
    const result = await cliente.findByIdAndRemove(clienteId);

    if (result) {
      res.status(200).json({
        status: 'success',
        message: 'Cliente eliminado correctamente',
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Cliente no encontrado',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al eliminar el cliente',
    });
  }
};

const updateCliente = async (req, res) => {
  try {
    const clienteId = req.params.clienteId; 
    const { DNI, telefono, email, nombre_completo } = req.body; 

    const updatedCliente = await cliente.findByIdAndUpdate(
      clienteId,
      { DNI, telefono, email, nombre_completo },
      { new: true }
    );

    if (updatedCliente) {
      res.status(200).json({
        status: 'success',
        data: updatedCliente,
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Cliente no encontrado',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al actualizar el cliente',
    });
  }
};


  module.exports={
    getClientes,
    createCliente,
    deleteCliente,
    updateCliente
  }

      
    
