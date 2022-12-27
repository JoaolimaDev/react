import React from 'react';
import api from './Api';

export default class Login extends React.Component {


  constructor(props){
   
      super(props)
      this.state = {
        name: '',
        password : ''
      }

  }

  
  handleChange = event => {
    
    
    this.setState({ [event.target.name]: event.target.value });

  
  }

  handleSubmit = event => {
    event.preventDefault();


    const parse = JSON.stringify({name: this.state.name, password: this.state.password});

    const options = {
      headers: {
      'Content-Type': 'application/json'
      }

    }
    

    api.post("user-action/login/", parse, options)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Login:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <br/>
          <br/>
          <label>
            Senha:
            <input type="password" name="password" onChange={this.handleChange} />
          </label>
          <br/>
          <br/>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

