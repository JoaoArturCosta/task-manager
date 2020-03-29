import React from 'react'
import Todo from './Todo'

const TodoList = (props) => {
    
    let todos = props.todos

    React.useEffect(() => {
      todos = props.todos
      
    }, [props]) 
    
    return todos.map((todo) => {
      return (
        <Todo todo={todo} key={todo._id} remove={props.remove}/>
      )
    });
  }

export default  TodoList 