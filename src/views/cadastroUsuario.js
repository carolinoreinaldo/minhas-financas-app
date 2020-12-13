import React from 'react';

import Card from '../components/card';
import FormGroup from '../components/form-group';

// o withRouter serve para podermos acessar as urls do Router através do history.
// Vide o método cancelar desse componente
import { withRouter } from 'react-router-dom';

import UsuarioService from '../app/services/usuarioService';

//componente de mensagem
import {mensagemSucesso, mensagemErro} from '../components/toastr';

class Cadastrousuario extends React.Component {

    state = {
        nome : '',
        email : '',
        senha : '',
        senhaRepeticao : ''
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }
    cadastrar = () => {

        const msgs = this.validar();

        if(msgs && msgs.length > 0) {
            msgs.forEach( (msg, index) => {
                mensagemErro(msg)
            });
            return false;
        }

        const usuarioParaSalvar = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }

        this.usuarioService.cadastrar(usuarioParaSalvar)
        .then( response => {
            mensagemSucesso('Usuário cadastrado com sucesso!, Faça o Login para acessar o sistema');
            this.props.history.push('/login');
        }).catch(error => {
            mensagemErro(error.response.data);
        });
    }

    validar = () => {
        const msgs = [];
 
        if(!this.state.nome) {
            msgs.push('O campo nome é obrigatório');
        }
        if(!this.state.email) {
            msgs.push('O campo email é obrigatório');
        }else if ( !this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            msgs.push('O email é inválido');
        }       
        if(!this.state.senha) {  
            msgs.push('O campo senha é obrigatório');
        }
        if(!this.state.senhaRepeticao) {
            msgs.push('É obrigatório repedir a senha');
        }
        if(this.state.senha !== this.state.senhaRepeticao) {
            msgs.push('Os valoers para os campos senha e repetição da senha são diferentes');
        }
        return msgs;
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
                            <FormGroup  label="Nome: * " htmlFor="inputNome">
                                <input  
                                    type="text"
                                    id="inputNome"
                                    nome="nome"
                                    className="form-control"
                                    onChange={e => this.setState({nome : e.target.value})}
                                />
                            </FormGroup>
                            <FormGroup  label="Email: * " htmlFor="inputEmail">
                                <input  
                                    type="text"
                                    id="inputEmail"
                                    nome="email"
                                    className="form-control"
                                    onChange={e => this.setState({email : e.target.value})}
                                />
                            </FormGroup>
                            <FormGroup  label="Senha: *" htmlFor="inputSenha">
                                <input  
                                    type="password"
                                    id="inputSenha"
                                    nome="senha"
                                    className="form-control"
                                    onChange={e => this.setState({senha : e.target.value})}
                                />
                            </FormGroup>
                            <FormGroup  label="Repita a Senha: * " htmlFor="inputSenhaRepeticao">
                                <input  
                                    type="password"
                                    id="inputSenhaRepeticao"
                                    nome="nome"
                                    className="form-control"
                                    onChange={e => this.setState({senhaRepeticao : e.target.value})}
                                />
                            </FormGroup>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.cadastrar}
                            >Salvar</button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={ () => this.cancelar()}
                            >Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter( Cadastrousuario );