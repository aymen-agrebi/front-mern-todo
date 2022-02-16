import React, { useEffect, useState } from "react";
import Backdrop from "../../components/Backdrop/Backdrop";
import Todo from "../../components/Todo/Todo";
import TodoForm from "../../components/TodoForm/TodoForm";
import classes from "./Todos.module.css";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/todos")
      .then((response) => response.json())
      .then((responseData) => {
        setTodos(responseData.todos);
      });
  }, []);

  const showFormHandler = () => {
    setShowForm(!showForm);
  };
  const addTodo = (todo) => {
    fetch("http://localhost:3000/api/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setTodos((prevTodos) => [...prevTodos, responseData.todo]);
      });
  };

  const removeTodo = (id) => {
    fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      });
  };

  const updateTodoHandler = (todo) => {
    console.log(todo);
    const id = todo._id;
    fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setTodos((prevTodos) => [
          ...prevTodos.filter((todo) => todo._id !== id),
          responseData,
        ]);
      });
  };

  return (
    <div className={classes.Todos}>
      <h1>Welcom to mern-todo</h1>
      <Backdrop show={showForm} clicked={showFormHandler} />
      <TodoForm show={showForm} close={showFormHandler} onAddTodo={addTodo} />
      <h4>Your Tasks</h4>
      <button onClick={showFormHandler}>add task</button>
      <div className={classes.TodosCard}>
        {todos.map((todo) => (
          <Todo
            key={todo._id}
            data={todo}
            delete={removeTodo}
            updateTodo={updateTodoHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Todos;
