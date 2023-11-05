const express = require('express');
const platos_de_comida = require('../models/platos_de_comida_model');
const app = express();
app.use(express.urlencoded({ extended: true}));


  const getPlatosDeComida =async (req, res) => {
    const arrayPlatos = await  platos_de_comida.find({}).exec();
    if(!arrayPlatos||arrayPlatos.length===0){
      return res.status(404).json({
        status:"error",
        message:"no se encontraron platos"
      })
    }
    return res.status(200).json({
      status:"success",
      arrayPlatos
    })
  }
 

  const createPlato = async (req, res) => {
    try {
      const { nombre, descripcion, ingredientes, precio, apto_para_celiacos, 
        apto_para_veganos, apto_para_diabeticos, calorias, imagen } = req.body;
  
      const nuevoPlato = new platos_de_comida({
        nombre, 
        descripcion, 
        ingredientes, 
        precio, 
        apto_para_celiacos, 
        apto_para_veganos, 
        apto_para_diabeticos, 
        calorias, 
        imagen
      });
      
      await nuevoPlato.save();
  
      res.status(201).json({
        status: 'success',
        data: nuevoPlato,
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: 'No se pudo crear el plato de comida',
      });
    }
  }
  

  const deletePlato = async (req, res) => {
    try {
      const platoId = req.params.platoId;
      
      const result = await platos_de_comida.findByIdAndRemove(platoId);
  
      if (result) {
        res.status(200).json({
          status: 'success',
          message: 'Plato de comida eliminado correctamente',
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: 'Plato de comida no encontrado',
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Error al eliminar el plato de comida',
      });
    }
  };
 

  const updatePlato = async (req, res) => {
    try {
      const platoId = req.params.platoId; 
      const { nombre, descripcion, ingredientes, precio, apto_para_celiacos, 
        apto_para_veganos, apto_para_diabeticos, calorias, imagen } = req.body; 
  
      const updatedPlato = await platos_de_comida.findByIdAndUpdate(
        platoId,
        { nombre, descripcion, ingredientes, precio, apto_para_celiacos, 
          apto_para_veganos, apto_para_diabeticos, calorias, imagen },
        { new: true }
      );
  
      if (updatedPlato) {
        res.status(200).json({
          status: 'success',
          data: updatedPlato,
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: 'Plato de comida no encontrado',
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Error al actualizar el plato de comida',
      });
    }
  };
  

  module.exports={
    getPlatosDeComida,
    createPlato,
    deletePlato,
    updatePlato

  }

