import React, {Component} from 'react';
import {Form} from 'react-bootstrap';
import api from '../api/Api';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, Redirect } from 'react-router-dom';



export class Login extends Component {

  constructor(props){
   

    toast.configure()
    super(props)
    this.state = {
      user: '',
      senha : '',
      error_handle : false,
      img : false,
      checked : '',
      tm : false
      
    }

}

img = () => {

  if (!this.state.img) {
    
    return require("../../assets/images/private-account-icon.svg");

  }else{
    return require("../../assets/images/unblock-user-icon.svg");
  }

}


handleChange = event => {
    
  const specialChars =
  // eslint-disable-next-line
    /[`!#%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/; // sobrou o underline e o cifrão e o arroba

  if(specialChars.test(event.target.value)){
    
    this.component();
  }else if(!specialChars.test(event.target.value)){
    this.setState({ [event.target.name]: event.target.value });
  }

    

}

check = event => {

    if (event.target.checked) {
      this.setState({checked : event.target.value})
      
    } else {
      this.setState({checked : ''})
    }
  
}

component(){
  toast.warn('Por favor retire todos os caracteres especiais!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}

handleSubmit = event => {

  

  event.preventDefault();


  const parse = JSON.stringify({user: this.state.user, senha: this.state.senha});

  const options = {
    headers: {
    'Content-Type': 'application/json'
    }

  }
    
  

  api.post("user-action/login/", parse, options)
  .then(res => {

    this.setState({img : true});
    this.setState({error_handle : false});

    
  }).catch(err => { 
   
   
    this.setState({error_handle : true});
    
    if (err.response.status === 500) {
     
      this.setState({tm : true});
    }
    
    
  })

  
}



componentDidUpdate(){
  
  if (this.state.error_handle) {
    toast.error('Senha ou login inválidos!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })

      this.setState({error_handle : false});

  }
}


render() {

    return (
     
      <div>

        <div>
          {this.state.tm ?  <Switch>

<Redirect to="/error-pages/error-500" />

</Switch> : ''}
        </div>
          
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={
                  
                    this.img()
                
                } alt="logo" />
                </div>
                <h4>Bem vindo ao Sirus !</h4>
                <h6 className="font-weight-light">Faça o login para continuar.</h6>
                <Form className="pt-3" onSubmit={this.handleSubmit}>
                  <Form.Group className="d-flex search-field">
                    <Form.Control minLength="5" maxLength="15" name= "user" type="text" placeholder="Username" size="lg" className="h-auto"  onChange={this.handleChange}/>
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control minLength="8" maxLength="15" name="senha" type="password" placeholder="Password" size="lg" className="h-auto" onChange={this.handleChange}/>
                  </Form.Group>
                  <div className="mt-3">
                    <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">Logar</button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" onChange={this.check} value = "cheked"/>
                        <i className="input-helper"></i>
                        Mantenha-me Logado
                      </label>
                    </div>
                    <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-muted">Esqueceu sua senha?</a>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                  <a href="!#" onClick={event => event.preventDefault()} className="auth-link">Quer conhecer mais soluções em software?</a>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>  

        
        
      </div>

      
    )
  }

    
  
}

export default Login
