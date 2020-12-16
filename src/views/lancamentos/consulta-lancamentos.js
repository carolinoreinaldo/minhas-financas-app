import React from 'react';

//react router
import { withRouter } from 'react-router-dom';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/SelectMenu';
import LancamentosTable from './lancamentosTable';
import LancamentoService from '../../app/services/lancamentoService';
import LocalStorageService from '../../app/services/localStorageService';

// import do modal do primereact
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import '../../Dialog.css';

// toastr para mostrar mensagens para o usuário
// '* as message' significa import dudo que está dentro de toastr
import * as message from '../../components/toastr';

class ConsultaLancamentos extends React.Component {

    constructor() {
        super();
        this.lancamentoService = new LancamentoService();
        this.usuario = LocalStorageService.obterUsuarioLogado();
    }

    state = {
        ano: '',
        mes: '',
        tipo: '',
        status: '',
        usuario: '',
        descricao: '',
        lancamentos: [],
        showConfirmDialog: false,
        lancamentoDeletar: {}
    }

    deletar = () => {
        const lancamentoDeletar = this.state.lancamentoDeletar;
        this.lancamentoService
            .deletar(lancamentoDeletar.id)
            .then(resposta => {
                //remove o elemento deletado do array
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamentoDeletar);
                /*
                O splice recebe dois parâmetros, o index que ele tem que deletar
                e quantos elementos ele tem que deletar a partir do index passado.
                */
                lancamentos.splice(index, 1);
                message.mensagemSucesso('Lançamento deletado com sucesso');

                //atualiza o stado de lançamentos
                this.setState({ lancamentos })
            }).catch(error => {
                message.mensagemErro(error.resposta.data);
            });

            this.setState({
                showConfirmDialog: false
            })
    }

    montaMsgErro = (campo) => {
        return `O preenchimento do campo ${campo} é obrigatório`;
    }

    buscar = () => {

        if (!this.state.ano) {
            message.mensagemErro(this.montaMsgErro('Ano'));
            return false;
        }

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: this.usuario.id
        }

        this.lancamentoService.consultar(lancamentoFiltro)
            .then(resposta => {
                this.setState({
                    lancamentos: resposta.data
                })
            }).catch(error => {
                console.log(error);
            })
    }

    renderFooter = () => {
        return (
            <div>
                <Button 
                    label="Cancelar" 
                    icon="pi pi-times" 
                    onClick={() => this.cancelarDelecao()} 
                    className="p-button-text" />
                <Button 
                    label="Confirmar" 
                    icon="pi pi-check" 
                    onClick={() => this.deletar()} 
                    autoFocus />
            </div>
        );
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({
            showConfirmDialog: true,
            lancamentoDeletar: lancamento
        })
    }

    cancelarDelecao = () => {
        this.setState({
            showConfirmDialog: false,
            lancamentoDeletar: {}
        })
    }

    render() {
        const meses = [
            { label: 'Selecione...', value: '' },
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Abril', value: 4 },
            { label: 'Março', value: 5 },
            { label: 'Junho', value: 6 },
            { label: 'Julho', value: 7 },
            { label: 'Agosto', value: 8 },
            { label: 'Setembro', value: 9 },
            { label: 'Outubro', value: 10 },
            { label: 'Novembro', value: 11 },
            { label: 'Dezembro', value: 12 },
        ]

        const tipos = [
            { label: 'Selecione...', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' },
        ]

        return (
            <Card title="Consulda Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputAno"
                                    aria-describedby="emailHelp"
                                    placeholder="Digite o Ano"
                                    value={this.state.ano}
                                    onChange={(e) => this.setState({ ano: e.target.value })} />
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mês:">
                                <SelectMenu
                                    lista={meses}
                                    className="form-control"
                                    id="inputMes"
                                    value={this.state.mes}
                                    onChange={(e) => this.setState({ mes: e.target.value })} />
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Tipo:">
                                <SelectMenu
                                    lista={tipos}
                                    className="form-control"
                                    id="inputMes"
                                    value={this.state.tipo}
                                    onChange={(e) => this.setState({ tipo: e.target.value })} />
                            </FormGroup>
                            <FormGroup htmlFor="inputDescricao" label="Descricao:">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputDescricao"
                                    value={this.state.descricao}
                                    onChange={(e) => this.setState({ descricao: e.target.value })} />
                            </FormGroup>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.buscar} >
                                Buscar
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger">
                                Cadastrar
                            </button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable
                                lancamentos={this.state.lancamentos}
                                deletar={this.abrirConfirmacao}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog
                        header="Header"
                        visible={this.state.showConfirmDialog}
                        style={{ width: '50vw' }}
                        modal={true}
                        footer={this.renderFooter()}
                        onHide={() => this.setState({ showConfirmDialog: false })}>
                        <p>Confirma a exclusão deste lançamento?</p>
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default ConsultaLancamentos;