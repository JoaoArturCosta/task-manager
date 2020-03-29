import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddForm from '../components/AddForm'

var axios = require('axios');
window.id = 0;

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            projectsData: []
        };
    }
    componentDidMount(){
        this.getProjects();
        
    };
    addProject(val){
        const project = {body: val, _id: window.id++, title: val, tasks:[]}
        console.log(project)
        this.state.projectsData.push(project);
        this.setState({data: this.state.data});
      }

    async getProjects(){
        const userEmail = localStorage.getItem('userEmail')
        await axios.get(`api/userprojects/${userEmail}`)
            .then((res)=>{
                console.log(res.data)
                this.setState({projectsData: res.data.projects});
            }).catch((err)=>{
                console.log(err);
            });
    };

    

    render() {
        return (
            <div className="Home_List">
                <div className="list_AddForm">
                    <h4>Task Manager</h4>
                    <AddForm addTodo={this.addProject.bind(this)}/>
                </div>
                
                
                <ul>
                    {   this.state.projectsData.map((item,index) => (
                            <li key={item._id}>
                                <Link to={{
                                    pathname: `/project/${item._id}`,
                                    state: {
                                        data: item
                                    }
                                    }}>
                                    <div className="List_element_title">
                                        project : {item.title}
                                    </div>
                                </Link>                                
                            </li>
                        ) )
                    }
                </ul>
            </div>
        );
    }
}

export default Home;