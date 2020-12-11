import React from 'react';

//apis 
import axios from 'axios';

//custom componentes
import Card from '../components/card';
import FormGroup from '../components/form-group';

//retorna o componente decorado
//olhar a funcao prepareCadastrar desse componentes
import { withRouter } from 'react-router-dom';

class Login extends React.Component {

    state = {
        email : '',
        senha : '',
        msgErro : null
    }

    entrar = async () => {
        const url = `http://localhost:8080/api/usuarios/autenticar`
        await axios.post(url, {
            email : this.state.email,
            senha : this.state.senha        
        }).then(response => {
            /*
                Coloca o usuario dentro do localStorage para ser acessado por toda
                a aplicação.

                Usa-se o JSON.stringify para transformar o objeto em string, ele nao
                pode ser passado como objeto.
            */
            localStorage.setItem('_usuario_logado', JSON.stringify(response.data))
            //manda pra home
            this.props.history.push('/home')
        }).catch(erro => {
            console.log('entrou no erro');
            this.setState({msgErro : erro.response.data})
        })
    }

    //vai preparar o meu formulario de cadastro
    prepareCadastrar = () => {
        //o metodo history.push é fornecido pelo withRouter importado nessa classe/componente
        this.props.history.push('/cadastro-usuarios')
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                    <Card title="Login">
                        <div className="row">
                            <span>{this.state.msgErro}</span>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup label="Email: *" htmlFor="exampleInputEmail" >
                                            <input 
                                                value={this.state.email}
                                                onChange={(e) => this.setState({email : e.target.value})}
                                                type="email" 
                                                className="form-control" 
                                                id="exampleInputEmail1" 
                                                aria-describedby="emailHelp" 
                                                placeholder="Digite o Email" />
                                        </FormGroup>
                                        <FormGroup label="Password: *" htmlFor="exampleInputPassword1">
                                            <input
                                                value={this.state.senha}
                                                onChange={(e) => this.setState({senha : e.target.value})}
                                                type="password" 
                                                className="form-control" 
                                                id="exampleInputPassword1" 
                                                placeholder="Password" />
                                        </FormGroup>

                                        <button 
                                            onClick={() => this.entrar()} 
                                            className="btn btn-success">
                                                Entrar
                                        </button>
                                        <button 
                                            onClick={() => this.prepareCadastrar()} 
                                            className="btn btn-danger">
                                                Cadastrar
                                        </button>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}

//withRouter decorando o componente provendo mais algumas funcionalidades
export default withRouter(Login);