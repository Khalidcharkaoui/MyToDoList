import React, { Component} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSave, faCheck } from "@fortawesome/free-solid-svg-icons";



export default class ElementoTarea extends Component{
    constructor(props){
        super(props);
        this.state= {
         isOpenModal: false,
         textoEditado: props.tarea.texto,
        };
    }

    abrirModal =() => {
        this.setState({ isOpenModal: true })
    };

    cerrarModal = () => {
        this.setState({ isOpenModal: false})
    };

    manejarEdicion=() => {
       const {tarea, editarTarea } = this.props;

       this.abrirModal();

       this.setState({textoEditado: tarea.texto});

       const guardarCambios=() => {
        editarTarea(tarea.id, this.state.textoEditado);
        this.cerrarModal();
       };

       this.setState({guardarCambios});

    };

    manejarCambioTexto = (e) => {
        this.setState({textoEditado: e.target.value })
    };

    render() {
      const {tarea, alternaTarea, eliminarTarea, completarTarea}= this.props;
      const {textoEditado, isOpenModal, guardarCambios} = this.state;

      return(
        <div className={`tarea-elemento ${tarea.completada? "completada": ""}`}>
            <span on onClick={() => alternaTarea(tarea.id)}>{tarea.texto}</span>
        
        {isOpenModal && (
            <div className="modal">
                <input type="text" value={textoEditado}
                onChange={this.manejarCambioTexto}/>
                <button onClick={guardarCambios}>
                    <FontAwesomeIcon icon={faSave}/> 
                </button>
                <button onClick={this.cerrarModal}>
                </button>
        </div>
        )}
        <div className="butones">
            <button onClick={this.manejarEdicion}>
                <FontAwesomeIcon icon ={faEdit}/>
            </button>
            <button onClick={() => eliminarTarea(tarea.id)}>
                <FontAwesomeIcon icon={faTrash}/>
            </button>
            <button
            onClick={() => completarTarea(tarea.id)}
            disabled={tarea.completada}
            >
                <FontAwesomeIcon icon={faCheck}/>
            </button>
        </div>
        </div>
      );
        }
    }