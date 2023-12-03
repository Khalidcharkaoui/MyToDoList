import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";




export default class FormularioTarea extends Component{
    render(){
        const {nuevoTextoTarea, establecerNuevoTextoTarea, agregarTarea} = this.props;

        return(
            <div className="tarea-formu">
                <input
                type="text"
                placeholder="Nueva Tarea"
                value={nuevoTextoTarea}
                onChange={(e) => establecerNuevoTextoTarea(e.target.value)}
                />
                <button onClick={agregarTarea}>
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
            </div>
        );
    }
}