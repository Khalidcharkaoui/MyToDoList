import React, { Component } from "react";

export default class Counter extends Component{
    render(){
        const{ totalTasks, pendingTasks } = this.props;

        return(
            <div className="task-count">
                <p>Total de tareas: {totalTasks}</p>
                <p>Tareas pendientes: {pendingTasks}</p>
            </div>
        );
    }
};