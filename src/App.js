import React, { Component } from "react";
import FormularioTarea from "./FormularioTarea";
import ListaTareas from "./ListaTareas";
import ContadorTareas from "./ContadorTareas";

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
    this.actualizarConteoTareas();
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.tareas !== this.state.tareas){
      this.actualizarConteoTareas();
    }
  }

  actualizarConteoTareas() {
    const { tareas } = this.state;
    const totalTareasCount = tareas.length;
    const tareasPendientesCount = tareas.filter((tarea) => !tarea.completada).length;

    this.setState({
      totalTareas: totalTareasCount,
      tareasPendientes : tareasPendientesCount,
    });

  }

  agregarTarea = (e) => {
    e.preventDefault();

    this.setState((prevState) => {
      const {nuevoTextoTarea, tareas } = prevState;

    if (nuevoTextoTarea.trim() !== ""){
      return{
        tareas: [
          ...tareas,
          {
        id: tareas.length + 1,
        texto: nuevoTextoTarea,
        completada: false,
      },
    ],
    nuevoTextoTarea: "",
  };
}
return prevState;
    });
  };

  alternarTarea= (idTarea) => {
    this.setState((prevState) => ({ 
      tareas: prevState.tareas.map((tarea) => 
      tarea.id === idTarea? {...tarea, completada: !tarea.completada } : tarea
      ),
    }));
  };

  eliminarTarea = (idTarea) => {
    this.setState((prevState) => ({
      tareas : prevState.tareas.filter((tarea) =>
      tarea.id === idTarea ? { ...tarea, completada: !tarea.completada } : tarea
      ),
  }));
};

  editarTarea = (idTarea, nuevoTexto ) => {
    this.setState((prevState) => {
      const tareasActualizadas = prevState.tareas.map((tarea) =>
        tarea.id === idTarea ? { ...tarea, texto: nuevoTexto } : tarea
      );

      return {
        tareas: tareasActualizadas,
      };
    });
  };
   
  completarTarea = (idTarea) => {
    this.setState((prevState) => ({
      tareas: prevState.tareas.map((tarea) =>
        tarea.id === idTarea ? { ...tarea, completada: true } : tarea
      ),
    }));
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

