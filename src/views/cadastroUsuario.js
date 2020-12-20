import React from 'react';

import Card from '../components/card';
import FormGroup from '../components/form-group';

// o withRouter serve para podermos acessar as urls do Router através do history.
// Vide o método cancelar desse componente
import { withRouter } from 'react-router-dom';

import UsuarioService from '../app/services/usuarioService';

//componente de mensagem
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Icone from '../components/icon';

class Cadastrousuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }
    cadastrar = () => {

        try {
            const { nome, email, senha, senhaRepeticao } = this.state;
            const usuarioParaValidar = { nome, email, senha, senhaRepeticao  };

            this.usuarioService.validar(usuarioParaValidar);
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => {
                mensagemErro(msg);
            });
            return false;
        }


        const usuarioParaSalvar = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }

        this.usuarioService.cadastrar(usuarioParaSalvar)
            .then(response => {
                mensagemSucesso('Usuário cadastrado com sucesso!, Faça o Login para acessar o sistema');
                this.props.history.push('/login');
            }).catch(error => {
                mensagemErro(error.response.data);
            });
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render() {
        return (
            <Card title="Cadstro de Usuário">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="bs-component">
                            <FormGroup label="Nome: * " htmlFor="inputNome">
                                <input
                                    type="text"
                                    id="inputNome"
                                    nome="nome"
                                    className="form-control"
                                    onChange={e => this.setState({ nome: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup label="Email: * " htmlFor="inputEmail">
                                <input
                                    type="text"
                                    id="inputEmail"
                                    nome="email"
                                    className="form-control"
                                    onChange={e => this.setState({ email: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input
                                    type="password"
                                    id="inputSenha"
                                    nome="senha"
                                    className="form-control"
                                    onChange={e => this.setState({ senha: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup label="Repita a Senha: * " htmlFor="inputSenhaRepeticao">
                                <input
                                    type="password"
                                    id="inputSenhaRepeticao"
                                    nome="nome"
                                    className="form-control"
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })}
                                />
                            </FormGroup>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.cadastrar}>
                                <Icone tipoIcone='cadastrar'>
                                    Salvar
                                </Icone>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => this.cancelar()} >
                                <Icone tipoIcone='cancelar'>
                                    Cancelar
                                </Icone> 
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(Cadastrousuario);