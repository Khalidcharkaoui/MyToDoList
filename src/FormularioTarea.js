import React, { Component } from "react";




export default class FormularioTarea extends Component{
    render(){
        const {nuevoTextoTarea, establecerNuevoTextoTarea, agregarTarea} = this.props;

        return(
            <div>
                <input
                type="text"
                placeholder="Nueva Tarea"
                value={nuevoTextoTarea}
                onChange={(e) => establecerNuevoTextoTarea(e.target.value)}
                />
                <button onClick={agregarTarea}></button>
            </div>
        )
    }
}