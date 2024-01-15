import React, { useState } from "react";

const TodoList = () => {
  const [input, setInput] = useState("");
  const [listData, setlistdata] = useState([]);

  const inputHandle = (e) => {
    setInput(e.target.value);
  };
  const btnHandle = () => {
    setlistdata((listData) => {
      const updatedList = [...listData, input];
      return updatedList;
    });
  };
  const removeHandle = (index) => {
    const updatedTodoList = listData.filter((todo) => {
      return todo !== index;
    });
    setlistdata(updatedTodoList);
  };

  return (
    <>
      <div>
        <h2>Todo App</h2>
        <input
          className="input"
          type="text"
          placeholder="Write Here"
          value={input}
          onChange={inputHandle}
        />
        <button onClick={btnHandle}>Add</button>
        <p className="para-list">Here is your list</p>

        {listData &&
          listData.map((data, index) => {
            return (
              <>
                <h4 key={index}>{data}</h4>
                <button onClick={() => removeHandle(index)}>Remove</button>
              </>
            );
          })}
      </div>
    </>
  );
};
export default TodoList;
