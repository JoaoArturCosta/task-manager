import React from 'react'
import axios from 'axios'

window.id = 0;

const Todo = ({todo, remove}) => {
  return (
      <li>
          <p href="#" className="list-group-item" onClick={() => {remove(todo._id)}}>{todo.title}</p>
      </li>
  )
}

const AddForm = ({addTodo}) => {
  let input;

  return (
    <div className="input_form">
      <input ref={node => {
        input = node;
      }} placeholder="Add new task" />
      <button className="list_AddForm_button" onClick={() => {
        addTodo(input.value);
        input.value = '';
      }}>
        Add
      </button>
    </div>
  );
};

const TodoList = ({todos, remove}) => {
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo._id} remove={remove}/>)
  });
  return (<div className="list-group" style={{marginTop:'30px'}}>{todoNode}</div>);
}

class ProjectPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: {},
      tasks: []
    }
  }  

  componentDidMount(){
    this.getProjects()
  }

  getProjects = () => {
    axios.get(`api/userprojects/project${this.props.match.url.replace('/project','')}`)
        .then((res)=>{
          this.setState({data: res.data})
          this.setState({tasks: res.data.tasks})
        }).catch((err)=>{
            console.log(err);
        });
  };

  addTodo = (val) => {
    const todo = {body: val, _id: window.id++, title: val}
    axios.post(`api/tasks${this.props.match.url.replace('/project','')}`,
      todo)
      .then((res) => {
      this.state.data.tasks.push(todo)
      this.setState({tasks: this.state.tasks})
    })
    
  }

  handleRemove = (id) => {
    const remainder = this.state.tasks.filter((todo) => {
      if(todo._id !== id) 
        return todo;
    });
    console.log(`/tasks/delete/${id}`)
    axios.post(`api/tasks/delete/${id}`)
      .then((res) => {
        this.setState({tasks: remainder})
      })
  }
  render(){
    return (
        <div className="Project_List">             
          <div className="list_AddForm">
            <h4>
                { this.state.data.title }
            </h4>
            <AddForm addTodo={this.addTodo.bind(this)}/>
          </div>
            
            <div className="tasks_list">
                <ul>
                    <TodoList 
                    todos={this.state.tasks} 
                    remove={this.handleRemove.bind(this)}
                    />
                </ul>
                
            </div>
            
        </div>
    );
  }
    
  

}

export default ProjectPage;