import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ProjectPage from './components/ProjectPage';
import Home from './components/Home';
import Login from './components/Login'
import withAuth from './components/withAuth';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Login}/>
        <Route exact path="/Home" component={withAuth(Home)}/>
        <Route exact path="/project/:projectId" component={withAuth(ProjectPage)}/>
      </Router>
    </div>
  );
}

export default App;
