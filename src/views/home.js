import React from 'react';

//services
import UsuarioService from '../app/services/usuarioService';
import LocalStorageService from '../app/services/localStorageService';

//componente de mensagem
import {mensagemErro} from '../components/toastr';

//Contexto criado 
import { AuthContext } from '../main/provedorAutenticacao';

//retorna o componente decorado
//olhar a funcao prepareCadastrar desse componentes
import { withRouter } from 'react-router-dom';

class Home extends React.Component {

    state = {
        saldo: 150
    }

    constructor() {
        super()
        this.service = new UsuarioService();
    }

    componentDidMount() {
        /*
            Essa informação vem de provedorAutenticacao.js
        */
        const usuarioLogado = this.context.usuarioAutenticado;
        
        this.service.obterSaldo(usuarioLogado.id)
            .then(response => {
                this.setState({ saldo: response.data });
            }).catch(error => {
                mensagemErro(error.response.data);
        });
    }


    render() {
        return (

            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a
                        className="btn btn-primary btn-lg"
                        href="#/cadastro-usuarios"
                        role="button">
                        <i className="fa fa-users"></i> Cadastrar Usuário
                    </a>
                    <a
                        className="btn btn-danger btn-lg"
                        href="#/cadastro-lancamentos"
                        role="button">
                        <i className="fa fa-users"></i> Cadastrar Lançamento
                    </a>
                </p>
            </div>
        )
    }
}

// Aqui estou inscrevendo o Login no contexto criado
// em provedor de autenticação
Home.contextType = AuthContext;

export default withRouter(Home);