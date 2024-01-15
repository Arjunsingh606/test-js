import React from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../features/todoSlice";

const Todos = () => {

  const allTodo = useSelector((state) => state.todos) || [];
  const dispatch = useDispatch();
  
  console.log(allTodo, "todo array");
  return (
    <>
      <ul>
        {allTodo.map((todoItem) => (
          <li key={todoItem.id}>
            {todoItem.text}
            <Button
              onClick={() => dispatch(removeTodo(todoItem.id))}
              variant="primary"
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;
