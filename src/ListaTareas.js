import React, { Component } from "react";
import ElementoTarea from "./ElementoTarea";

export default class ListaTareas extends Component {

    render(){
        const { tasks, toggleTask, deleteTask, editTask, completeTask } = this.props;

        return(
            <div className="task-list">
                {tasks.map((task) => (
                <ElementoTarea
                key={task.id}
                task={task}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                editTask={editTask}
                completeTask={completeTask}
                />
            
            ))}
            </div>
        );
    }
}