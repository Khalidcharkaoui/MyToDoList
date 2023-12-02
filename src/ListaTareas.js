import React, { Component } from "react";
import ElementoTarea from "./ElementoTarea";

export default class ListaTareas extends Component {

    render(){
        const { tareas } = this.props;

        return(
            <div>
                {tareas.map((tarea) => (
                <ElementoTarea
                key={tarea.id}
                task={tarea}
                />
            
            ))}
            </div>
        );
    }
}