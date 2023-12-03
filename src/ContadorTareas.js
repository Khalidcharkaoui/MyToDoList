import React, { Component } from "react";

export default class ContadorTareas extends Component{
    render(){
        const{ totalTareas, tareasPendientes } = this.props;

        return(
            <div>
                <p>Total de tareas: {totalTareas}</p>
                <p>Tareas pendientes: {tareasPendientes}</p>
            </div>
        );
    }
}