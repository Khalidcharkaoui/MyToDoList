import React, { Component} from "react";




export default class ElementoTarea extends Component{
    constructor(props){
        super(props);
        this.state= {
         editando: false,
         textoEditado: props.tarea ? props.tarea.texto : "",
        };
    }

    manejarEdicion=() => {
        this.setState((prevState) => ({
          editando: !prevState.editando,  
        }));
    
        if (!this.state.editando) {
            // para guardar cambios una vez la edicion se haya completado
            const {tarea, editarTarea} = this.props;
            editarTarea(tarea.id, this.state.textoEditado)
        }
    };

    manejarCambioTexto = (e) => {
        this.setState({textoEditado: e.target.value })
    };

    render() {
      const {tarea, alternaTarea, eliminarTarea, completarTarea}= this.props;
      const {editando, textoEditado} = this.state;

      return(
        <div>
            { tarea? (
        <div>
         {editando ? (
                    <input
                     type="text"
                     value={textoEditado}
                     onChange={this.manejarCambioTexto}
                     />
                )
                :(
                    <span onClick={() => alternaTarea(tarea.id)}> {tarea.texto} </span>
                )}
                <div>
                    <button onClick={this.manejarEdicion}></button>
                    <button onClick={() => eliminarTarea(tarea.id)}></button>
                    {!editando && (
                        <button
                         onClick={() => completarTarea(tarea.id)}
                         disabled={tarea.completada}
                         ></button>
                    )}
                </div>
            </div>
            ): null}
            </div>
        );
    }

}