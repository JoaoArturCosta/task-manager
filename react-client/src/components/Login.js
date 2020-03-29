import React, { Component } from 'react';
import axios from 'axios'

export default class Login extends Component {
    constructor(props) {
      super(props)
      this.state = {
        email : '',
        password: ''
      };
    }  
    
    handleInputChange = (event) => {
      const { value, name } = event.target;
      this.setState({
        [name]: value
      });
    }  
    
    onSubmit = (event) => {
      event.preventDefault();
      axios.post('/api/authenticate', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userEmail', this.state.email)
          this.props.history.push('/Home');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      });
    }  
    
    render() {
      return (
        <section className="login">
          <form onSubmit={this.onSubmit} className="login_form">
            <h1>Entrar</h1>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
              className="login_form_input"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
              className="login_form_input"
            />
          <input type="submit" value="Continuar" className="login_form_button"/>
          </form>
        </section>

      );
    }
  }