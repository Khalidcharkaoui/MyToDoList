import React, { Component} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSave, faCheck } from "@fortawesome/free-solid-svg-icons";



export default class Item extends Component{
    constructor(props){
        super(props);
        this.state= {
         isModalOpen: false,
         editedText: props.task.text,
        };
    }

    openModal =() => {
        this.setState({ isModalOpen: true });
    };

    closeModal = () => {
        this.setState({ isModalOpen: false});
    };

    handleEdit=() => {
       const { task, editTask } = this.props;

       this.openModal();

       this.setState({ editedText: task.text});

       const saveChanges = () => {
        editTask(task.id, this.state.editedText);
        this.closeModal();
       };

       this.setState({ saveChanges });

    };

    handleTextChange = (e) => {
        this.setState({ editedText: e.target.value })
    };

    render() {
      const { task, toggleTask, deleteTask, completeTask}= this.props;
      const { editedText, isModalOpen, saveChanges} = this.state;

      return(
        <div className={`task-item ${task.completed ? "completed" : ""}`}>
            <span on onClick={() => toggleTask(task.id)}>{task.text}</span>
        
        {isModalOpen ? (
            <div className="modal">
                <input type="text" value={editedText} onChange={this.handleTextChange} />
                <button onClick={saveChanges}>
                    <FontAwesomeIcon icon={faSave}/> Guardar
                </button>
                <button onClick={this.closeModal}>
                    Cancelar
                </button>
        </div>
        ) : (
        <>
        <span onClick={() => toggleTask(task.id)}></span>
        <div className="buttons">
            <button onClick={this.handleEdit}>
                <FontAwesomeIcon icon ={faEdit}/>
            </button>
            <button onClick={() => deleteTask(task.id)}>
                <FontAwesomeIcon icon={faTrash}/>
            </button>
            <button
            onClick={() => completeTask(task.id)}
            disabled={task.completed}
            >
                <FontAwesomeIcon icon={faCheck}/>
            </button>
        </div>
        </>
        )}
        </div>
      );
    }
}