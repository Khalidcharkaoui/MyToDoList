import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";




export default class Form extends Component{
    render(){
        const {newTaskText, setNewTaskText, addTask} = this.props;

        return(
            <div className="task-form">
                <input
                type="text"
                placeholder="Nueva Tarea"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                />
                <button onClick={addTask}>
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
            </div>
        );
    }
};