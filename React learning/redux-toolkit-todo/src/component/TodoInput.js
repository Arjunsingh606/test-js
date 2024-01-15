import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "./todoInput.css";
import { useDispatch } from 'react-redux'
import { addTodo } from "../features/todoSlice";

const TodoInput = () => {
    const [input, setInput] = useState("Hello world");
    const dispatch = useDispatch();

    const handleChange = (e) => {
        e.preventDefault();
        if (input.trim() !== '') {
            dispatch(addTodo(input));
            setInput('');
          }
        console.log("clicked");
    };

    return (
        <>
            <div className="todo-form">
                <Form  className="col-md-4 text-center ">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Add todo</Form.Label>
                        <div className="todo-input">
                            <Form.Control
                                type="text"
                                value={input}
                                onChange={(e)=>setInput(e.target.value)}
                                placeholder=""
                            />
                            <Button as="input" onClick={handleChange} type="button" value="Add todo" />
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </>
    );
};

export default TodoInput;
