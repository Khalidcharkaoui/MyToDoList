import React, { Component } from "react";
import Item from "./Item";

export default class List extends Component {

    render(){
        const { tasks, toggleTask, deleteTask, editTask, completeTask } = this.props;

        return(
            <div className="task-list">
                {tasks.map((task) => (
                <Item
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