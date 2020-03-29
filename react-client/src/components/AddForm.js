import React from 'react'

const TodoForm = ({addTodo}) => {
    // Input tracker
    let input;
  
    return (
      <div className="input_form">
        <input ref={node => {
          input = node;
        }} placeholder="Add new"/>
        <button className="list_AddForm_button" onClick={() => {
          addTodo(input.value);
          input.value = '';
        }}>
          Add
        </button>
      </div>
    );
  };

export default TodoForm 