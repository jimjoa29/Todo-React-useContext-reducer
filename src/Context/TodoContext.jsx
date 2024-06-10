import { createContext, useReducer } from "react";

//Crear el Contexto
const TodoContext = createContext();

//Creamos el Estado Inicial

const estoInicial = {
  tareas: [],
};

// Reducer: una función que decide cómo cambiar el estado
const TodoReducer = (estado, accion) => {
  switch (accion.tipo) {
    case "agregar":
      return {
        tareas: [
          ...estado.tareas,
          { id: Date.now(), texto: accion.texto, completado: false },
        ],
      };
    case "toggle":
      return {
        tareas: estado.tareas.map((tarea) =>
          tarea.id === accion.id
            ? { ...tarea, completado: !tarea.completado }
            : tarea
        ),
      };
    case "eliminar":
      return {
        tareas: estado.tareas.filter((tarea) => tarea.id !== accion.id),
      };

    case "vaciar":
        return {
            tareas: []
        }

    default:
      return estado;
  }
};

// Provider: es un componente que devuelve nuestra aplicación y proporciona el estado global

const TodoProvider = ({ children }) => {
  const [estado, dispatch] = useReducer(TodoReducer, estoInicial);

  return (
    <TodoContext.Provider value={{ estado, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
