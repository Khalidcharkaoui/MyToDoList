import React, { Component } from "react";
import FormularioTarea from "./FormularioTarea";
import ListaTareas from "./ListaTareas";

export default class Aplicacion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tareas: [],
      nuevoTextoTarea: "",

    };
  }

  agregarTarea = (e) => {
    e.preventDefault();

    const { nuevoTextoTarea } = this.state;

    if (nuevoTextoTarea.trim() !== ""){
      const nuevaTarea = {
        id: Date.now(),
        texto: nuevoTextoTarea,

      };

      this.setState((prevState) => ({
        tareas: [...prevState.tareas, nuevaTarea],
      }));
      }
    }

    render(){
      const {nuevoTextoTarea, tareas} = this.state;

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
          />

        </div>
      )
    }
  }

