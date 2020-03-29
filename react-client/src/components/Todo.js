import React from 'react'
import { render } from 'react-dom';


const Todo = ({todo, remove}) => {
    // Each Todo
    return (
        <li>
            <p className="list-group-item" onClick={() => {remove(todo._id)}}>{todo.body}</p>
        </li>
    )
  }
  
export default  Todo 