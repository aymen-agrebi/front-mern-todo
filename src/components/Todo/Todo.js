import React, { useState } from "react";
import classes from "./Todo.module.css";

const Todo = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [enteredTask, setEntredTask] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const editHandler = () => {
    setShowEdit(!showEdit);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.updateTodo({
      _id: props.data._id,
      task: enteredTask,
      startTime: startTime,
      endTime: endTime,
    });
    editHandler();
  };

  let content = (
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
      <input
        type="time"
        id="startTime"
        value={startTime}
        onChange={(event) => setStartTime(event.target.value)}
      />
      <input
        type="time"
        id="endTime"
        value={endTime}
        onChange={(event) => setEndTime(event.target.value)}
      />
      <button onClick={submitHandler}>save</button>
      <button onClick={() => props.delete(props.data._id)}>remove</button>
    </form>
  );
  if (!showEdit) {
    content = (
      <ul>
        <li>
          {props.data.startTime} - {props.data.endTime}
        </li>
        <li>{props.data.task}</li>
        <li>
          <button onClick={editHandler}>edit</button>
          <button onClick={() => props.delete(props.data._id)}>remove</button>
        </li>
      </ul>
    );
  }
  return <div className={classes.Todo}>{content}</div>;
};

export default Todo;
