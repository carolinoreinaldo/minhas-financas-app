import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
class Login extends React.Component {

    state = {
        email = '',
        senha = ''
    }

    entrar = () => {

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail" >
                                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite o Email" />
                                            </FormGroup>
                                            <FormGroup label="Password: *" htmlFor="exampleInputPassword1">
                                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                            </FormGroup>

                                            <button onclick="window.location.href='home.html'" type="button" class="btn btn-success">Entrar</button>
                                            <button onclick="window.location.href='usuarios.html'" type="button" class="btn btn-danger">Cadastrar</button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;