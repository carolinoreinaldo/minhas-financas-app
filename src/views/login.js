import React from 'react';

//custom componentes
import Card from '../components/card';
import FormGroup from '../components/form-group';

//services
import UsuarioService from '../app/services/usuarioService';
import LocalStorageService from '../app/services/localStorageService';

//retorna o componente decorado
//olhar a funcao prepareCadastrar desse componentes
import { withRouter } from 'react-router-dom';

//componente de mensagem
import { mensagemErro } from '../components/toastr';
import Icone from '../components/icon';

class Login extends React.Component {

    state = {
        email: '',
        senha: '',
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    entrar = async () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            /*
                Coloca o usuario dentro do localStorage para ser acessado por toda
                a aplicação.

                Usa-se o JSON.stringify para transformar o objeto em string, ele nao
                pode ser passado como objeto.
            */
            const chaveUsuario = LocalStorageService.chaveUsuarioLogado;
            LocalStorageService.adicionarItem(chaveUsuario, response.data)
            //manda pra home usando o history.push do react route
            this.props.history.push('/home')
        }).catch(erro => {
            if (erro.response && erro.response.data) {
                mensagemErro(erro.response.data);
            } else {
                mensagemErro('Houve um erro ao realizar o login. Por favor tente novamente mais tarde.');
            }

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
                                                onChange={(e) => this.setState({ email: e.target.value })}
                                                type="email"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                placeholder="Digite o Email" />
                                        </FormGroup>
                                        <FormGroup label="Password: *" htmlFor="exampleInputPassword1">
                                            <input
                                                value={this.state.senha}
                                                onChange={(e) => this.setState({ senha: e.target.value })}
                                                type="password"
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                placeholder="Password" />
                                        </FormGroup>

                                        <button
                                            onClick={() => this.entrar()}
                                            className="btn btn-success">
                                            <Icone tipoIcone="entrar">
                                                Entrar
                                            </Icone>
                                        </button>
                                        <button
                                            onClick={() => this.prepareCadastrar()}
                                            className="btn btn-danger">
                                            <Icone tipoIcone="cadastrar">
                                                Cadastrar Novo
                                            </Icone>
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