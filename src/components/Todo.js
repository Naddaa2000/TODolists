import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/Todo/todoSlice";


function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [todo, setTodo] = useState({ id: null, etext: "" });
  const ref = useRef(null);

  const update = (currentTodo) => {
    setTodo({ id: currentTodo.id, etext: currentTodo.text });
    ref.current.click();
  };

  const onChange = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const saveChanges = () => {
    dispatch(updateTodo({ id: todo.id, text: todo.etext }));
    ref.current.click();
  };

  return (
    <>
      <h1>Todos</h1>
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Todo List
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                  Todo list
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etext"
                  name="etext"
                  value={todo.etext}
                  onChange={onChange}
                  placeholder="Enter your text here..."
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" onClick={saveChanges} className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        {todos.map((todo) => (
          <div className="col-md-4" key={todo.id}>
            <div className="card my-3 mx-4">
              <div className="card-body">
                <h1 className="card-text" name="text">
                  {todo.text}
                </h1>
                <button onClick={() => dispatch(removeTodo(todo.id))} className="btn btn-danger my-3 mx-6">
                  Remove
                </button>
                <button onClick={() => update(todo)} className="btn btn-info my-3 mx-6">
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Todos;
