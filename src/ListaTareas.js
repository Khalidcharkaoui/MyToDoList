import React, { Component } from "react";
import ElementoTarea from "./ElementoTarea";

export default class ListaTareas extends Component {

    render(){
        const { tareas, alternaTarea, eliminarTarea, editarTarea, completarTarea } = this.props;

        return(
            <div className="tarea-lista">
                {tareas.map((tarea) => (
                <ElementoTarea
                key={tarea.id}
                task={tarea}
                alternaTarea={alternaTarea}
                eliminarTarea={eliminarTarea}
                editarTarea={editarTarea}
                completarTarea={completarTarea}
                />
            
            ))}
            </div>
        );
    }
}