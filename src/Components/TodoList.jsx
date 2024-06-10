import { useContext, useState } from "react";
import { TodoContext } from "../Context/TodoContext";

const TodoList = () => {
  const { estado, dispatch } = useContext(TodoContext);
  const [texto, setTexto] = useState("");

  
  const agregarTexto = (e) => {
    e.preventDefault();

    if (texto.trim()) {
      dispatch({ tipo: "agregar", texto });
      setTexto("");
    }
  };

  const vaciar = () => {
    dispatch({tipo: 'vaciar'})
  }

  return (
    <div className="contenedor-listado">
      <form onSubmit={agregarTexto}>
        <input
            className="input-text"
          type="text"
          placeholder="Ingresa una Tarea"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button type="submit" className="btn">Agregar</button>
       
      </form>

      <ul className="listado" >
        {estado.tareas.map((tarea) => (
          <li key={tarea.id} className="lista">
            <span
                className="text-span"
                onClick={() => dispatch({ tipo: "toogle", id: tarea.id })}
            >
             {tarea.texto}  {' '}
            </span>
            <button
              onClick={() => dispatch({ tipo: "eliminar", id: tarea.id })}
            >
              Eliminar
            </button>
          </li>
          
        ))}
      </ul>
      <button onClick={vaciar} className="btn vaciar">Vaciar</button>
    </div>
  );
};

export default TodoList;
