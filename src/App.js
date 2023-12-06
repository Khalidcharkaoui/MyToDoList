import React, { Component } from "react";
import axios from "axios";
import Form from "./Form";
import List from "./List";
import Counter from "./Counter";
import "./App.css"

const API_BASE_URL = "https://mylistserver.onrender.com";        //"http://127.0.0.1:5000";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      newTaskText: "",
      totalTasks: 0,
      pendingTasks: 0,
    };
  }

  componentDidMount(){
    this.fetchTasks();
  }

  async fetchTasks(){

    try{

      const respuesta = await axios.get(`${API_BASE_URL}/tasks`);
      const {tasks, total_tasks, pending_tasks } = respuesta.data;

      this.setState({

        tasks,
        totalTasks: total_tasks,
        pendingTasks: pending_tasks,

      });
    } catch(error) {
      console.error("Error al obtener las tareas:", error);
    }
      }
    
    addTask = async(e) => {
      e.preventDefault();

      const { newTaskText } = this.state;

      if (newTaskText.trim() !== ""){
        try{
          await axios.post(`${API_BASE_URL}/tasks`, {
            text: newTaskText,
            completed: false,
          });

    this.fetchTasks();

    this.setState({
      newTaskText:"",

    });
        } catch (error){
          console.error("error al agregar la tarea:", error);
      }
    }
  };

   toggleTask = async (taskId) => {
    try{
      await axios.put(`${API_BASE_URL}/tasks/${taskId}`, {
      completed: !this.getTaskById(taskId).completed,

      });
  
    this.fetchTasks();
    } catch (error){
      console.error("Error al alternar tarea:", error);
    }
  };

  deleteTask = async (taskId) => {
     try{
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);

      this.fetchTasks();
     } catch(error){
      console.error("error al eliminar la tarea:", error);
     }
    };

  editTask = async(taskId, newText) =>{
    try{
      await axios.put(`${API_BASE_URL}/tasks/${taskId}`,{text: newText});

   this.fetchTasks();

  } catch (error){
    console.error("Error al editar la tarea:", error);
  }
};

  completeTask = async (taskId) => {
    try{
      await axios.put(`${API_BASE_URL}/tasks/${taskId}`, {completed: true});

    this.fetchTasks();
  } catch (error) {
    console.error("error al completar la tarea:", error);
  }
  };

  getTaskById = (taskId) => {
    return this.state.tareas.find((task) => task.id === taskId);
  };
  
    render(){
      const {newTaskText, tasks, totalTasks, pendingTasks } = this.state;

      return(
        <div className="app-container">
          <h1> Lista de Tareas </h1>
          <Form
          newTaskText={newTaskText}
          setNewTaskText={(text) => this.setState({newTaskText : text})}
          addTask={this.addTask}
          />
          <List
          tasks={tasks}
          toggleTask={this.toggleTask}
          deleteTask={this.deleteTask}
          editTask={this.editTask}
          completeTask={this.completeTask}
          />
          <Counter totalTasks={totalTasks} pendingTasks={pendingTasks} />
        </div>
      );
    }
  }

