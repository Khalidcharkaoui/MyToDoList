import React, { Component } from "react";
import axios from "axios";
import FormularioTarea from "./FormularioTarea";
import ListaTareas from "./ListaTareas";
import ContadorTareas from "./ContadorTareas";

const API_BASE_URL = "";

export default class Aplicacion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tareas: [],
      nuevoTextoTarea: "",
      totalTareas: 0,
      tareasPendientes: 0,
    };
  }

  componentDidMount(){
    this.obtenerTareas();
  }

  async obtenerTareas(){

    try{

      const respuesta = await axios.get(`${API_BASE_URL}/tareas`);
      const {tareas, total_tareas, tareas_pendientes } = respuesta.data;

      this.setState({

        tareas,
        totalTareas: total_tareas,
        tareasPendientes: tareas_pendientes,

      });
    } catch(error) {
      console.error("Error al obtener las tareas:", error);
    }
      }
    
    agregarTarea = async(e) => {
      e.preventDefault();

      const { nuevoTextoTarea } = this.state;

      if (nuevoTextoTarea.trim() !== ""){
        try{
          await axios.post(`${API_BASE_URL}tareas`, {
            texto: nuevoTextoTarea,
            completada: false,
          });

    this.obtenerTareas();

    this.setState({
      nuevoTextoTarea:"",

    });
        } catch (error){
          console.error("error al agregar la tarea:", error);
      }
    }
  };

   alternarTarea = async (idTarea) => {
    try{
      await axios.put(`${API_BASE_URL}/tareas/${idTarea}`, {
      completada: !this.obtenerTareaPorId(idTarea).completada,

      });
  
    this.obtenerTareas();
    } catch (error){
      console.error("Error al alternar tarea:", error)
    }
  };

  eliminarTarea = async (idTarea) => {
     try{
      await axios.delete(`${API_BASE_URL}/tareas/{idTarea}`);

      this.obtenerTareas();
     } catch(error){
      console.error("error al eliminar la tarea:", error);
     }
    };

  editarTarea = async(idTarea, nuevoTexto) =>{
    try{
      await axios.put(`${API_BASE_URL}/tareas/${idTarea}`,{texto: nuevoTexto
    });

  this.obtenerTareas();

  } catch (error){
    console.error("Error al editar la tarea:", error);
  }
};

  completarTarea = async (idTarea) => {
    try{
      await axios.put(`${API_BASE_URL}/tareas/${idTarea}`, {completada: true
    });

  this.obtenerTareas();
  } catch (error) {
    console.error("error al completar la tarea:", error)
  }
  };

  obtenerTareaPorId = (idTarea) => {
    return this.state.tareas.find((tarea) => tarea.id ===idTarea);
  };
  
    render(){
      const {nuevoTextoTarea, tareas, totalTareas, tareasPendientes} = this.state;

      return(
        <div>
          <h1> Lista de Tareas </h1>
          <FormularioTarea
          nuevoTextoTarea={nuevoTextoTarea}
          establecerNuevoTextoTarea={(texto) => this.setState({nuevoTextoTarea : texto})}
          agregarTarea={this.agregarTarea}
          />
          <ListaTareas
          tareas={tareas}
          alternarTarea={this.alternarTarea}
          eliminarTarea={this.eliminarTarea}
          editarTarea={this.editarTarea}
          completarTarea={this.completarTarea}
          />
          <ContadorTareas totalTareas={totalTareas} tareasPendientes={tareasPendientes} />
        </div>
      )
    }
  }

