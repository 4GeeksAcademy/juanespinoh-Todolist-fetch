import React, { useEffect, useState } from "react";
import "./TodoListStyles.css";
import { use } from "react";

const TodoContainer = ({ todoText, deleteTodo, id }) => {
  const [showButton, setShowButton] = useState(false);

  const deleteHandler = () => {
    deleteTodo(id);
  };

  const showButtonHandler = () => setShowButton((prev) => !prev);
  return (
    <div
      className="todoContainer "
      onMouseEnter={showButtonHandler}
      onMouseLeave={showButtonHandler}
    >
      <p className="m-0">{todoText}</p>
      {showButton && (
        <button
          onClick={deleteHandler}
          className="btn btn-danger deleteButton "
        >
          X
        </button>
      )}
    </div>
  );
};

const ListContainer = ({ list, deleteTodo }) => (
  <div className="listContainer ">
    {list.map((elemnt, i) => (
      <TodoContainer
        key={i}
        todoText={elemnt.label}
        id={elemnt.id}
        deleteTodo={deleteTodo}
      />
    ))}
  </div>
);

const TodoList = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // FUNCION PARA TRAER USUSARIO Y TODOS
  const fetchUserAndTodo = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/juanespinoh"
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  // FUNCION PARA TRAER AGREGAR TODOS
  const addTodo = async (text) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/todos/juanespinoh",
        {
          method: "POST",
          body: JSON.stringify({
            label: text,
            is_done: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      fetchUserAndTodo();

      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // FUNCION PARA ELIMINAR TODOS
  const deleteTodo = async (id) => {
    setIsLoading(true);
    try {
      await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
      });

      fetchUserAndTodo();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // FUNCION PARA ELIMINAR TODOS LOS TODOS
  const deleteAllTodos = async () => {
    setIsLoading(true);
    try {
      await fetch(`https://playground.4geeks.com/todo/user/juanespinoh`, {
        method: "DELETE",
      })
        .then(() => {
          fetch(`https://playground.4geeks.com/todo/user/juanespinoh`);
        })
        .then(() => fetchUserAndTodo())
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // PRIMERA CARGA DE USUARIO Y TASKS
  useEffect(() => {
    fetchUserAndTodo();
  }, []);

  // HANDLLER PARA EL INPUT
  const addTaskHandler = (e) => {
    if (e.key === "Enter") {
      if (e.target.value !== "") {
        addTodo(e.target.value);
        e.target.value = "";
      }
    }
    return;
  };

  return (
    <div className="mainContainer">
      <input
        type="text"
        onKeyDown={addTaskHandler}
        placeholder="Write and press enter to add to list."
        className="p-2"
      />

      {isLoading === false ? (
        user.todos.length !== 0 ? (
          <>
            <button  onClick={deleteAllTodos} className="btn btn-danger mt-2 mb-2">Delete all</button>
            <ListContainer list={user.todos} deleteTodo={deleteTodo} />
          </>
        ) : (
          <p className="m-0">No tasks, add a task</p>
        )
      ) : (
        <div className="spinner-border mt-2" role="status">
          <span className="sr-only"></span>
        </div>
      )}

      <div className="align-self-start p-2 ">
        {isLoading === true
          ? null
          : `${user.todos.length} ${
              user.todos.length === 1 ? "item" : "items"
            } `}
      </div>
    </div>
  );
};

export default TodoList;
