import React, { useState } from "react";
import classes from "./TodoForm.module.css";

const TodoForm = (props) => {
  const [enteredTask, setEntredTask] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddTodo({
      task: enteredTask,
      startTime: startTime,
      endTime: endTime,
    });
  };

  return (
    <div
      className={classes.TodoForm}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}>
      <button onClick={props.close} className={classes.Close}>
        X
      </button>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          id="task"
          placeholder="task"
          value={enteredTask}
          onChange={(event) => {
            setEntredTask(event.target.value);
          }}
        />
        <label htmlFor="startTime">from</label>
        <input
          type="time"
          id="startTime"
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
        />
        <label htmlFor="endTime">to</label>
        <input
          type="time"
          id="endTime"
          value={endTime}
          onChange={(event) => setEndTime(event.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default TodoForm;
