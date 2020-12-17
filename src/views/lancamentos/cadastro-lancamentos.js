import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LancamentoService from '../../app/services/lancamentoService';
import LocalStorageService from '../../app/services/localStorageService';


import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/SelectMenu';

// toastr para mostrar mensagens para o usuário
// '* as message' significa import dudo que está dentro de toastr
import * as message from '../../components/toastr';


class CadastroLancamentos extends Component {

    constructor() {
        super()
        this.lancamentoService = new LancamentoService();
    }

    state = {
        id: null,
        descricao: '',
        valor: '',
        tipo: '',
        mes: '',
        ano: '',
        status: '',
        tipos: [],
        meses: []
    }

    componentDidMount() {
        if(!this.state.tipos || this.state.tipos.length === 0) {
            this.lancamentoService.obterListaDeTipos()
                .then(response => {
                    let tiposFormatado = response.data.map(tipo => {
                        return { label: tipo, value: tipo }
                    })

                    tiposFormatado = [{ label: 'Selecione ...', value: '' }, ...tiposFormatado];
                    this.setState({ tipos: tiposFormatado })
                }).catch(error => {
                    message.mensagemErro(error)
                });
        }

        if(!this.state.meses || this.state.meses.length === 0) {
            this.lancamentoService.obterListaDeMeses()
                .then(response => {
                    const mesesBackEnd = [{ label: 'Selecione ...', value: '' }, ...response.data]
                    this.setState({ meses: mesesBackEnd })
                }).catch(error => {
                    message.mensagemErro(error)
                });
        }

        /*
        Como nós estamos decorando esse componente com o 'WithRouter',
        nós podemos pegar os parâmetros passados por url com o 
        'this.props.match.params'
        */
       const params  = this.props.match.params;
       if(params.id) {
           this.lancamentoService.obterPorId(params.id)
           .then( response => {
               console.log('response', response);
               this.setState({ ...response.data});
           }).catch( error => {
               console.log('error', error);
               message.mensagemErro(error.response.data);
           });
       }
    }

    /*
    Repare que para funcionar dessa forma, a tag que chama esse
    handleChange precisa ter a propriedade 'name' preenchida
    */
    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value});
    }

    salvar = () => {

        const usuarioLogadoId = LocalStorageService.obterUsuarioLogado().id;
        /*
        Operador Destructuring que desestrutura uma propriedade iterável
        em várias propriedades.
        */
        const { descricao, valor, mes, ano,tipo } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogadoId};
        
        this.lancamentoService.salvar(lancamento)
        .then( response => {
            message.mensagemSucesso('Lançamento cadastrado com sucesso!');
        }).catch(error => {
            message.mensagemErro(error.response.data);
        })
    }

    render() {

        return (
            <Card title="Cadastro de Lançamentos">
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                            <input
                                type="text"
                                className="form-control"
                                id="inputDescricao"
                                placeholder="Descrição" 
                                name="descricao"
                                onChange={this.handleChange}
                                value={this.state.descricao}/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input
                                type="text"
                                className="form-control"
                                id="inputAno" 
                                name="ano"
                                onChange={this.handleChange} 
                                value={this.state.ano} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputMes" label="Mês: *">
                            <SelectMenu
                                lista={this.state.meses}
                                className="form-control"
                                id="inputMes"
                                name="mes"          
                                onChange={this.handleChange}
                                value={this.state.mes} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputValor" label="Valor: *">
                            <input
                                type="text"
                                className="form-control"
                                id="inputValor"
                                placeholder="Ex.: 46,75" 
                                name="valor"
                                onChange={this.handleChange}
                                value={this.state.valor} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputTipo" label="Tipo: *">
                            <SelectMenu
                                lista={this.state.tipos}
                                className="form-control"
                                id="inputTipo"
                                name="tipo"
                                onChange={this.handleChange}
                                value={this.state.tipo} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputStatus" label="Status:">
                            <input
                                type="text"
                                className="form-control"
                                id="StatusAno"
                                disabled 
                                name="status"
                                onChange={this.handleChange}
                                value={this.state.status} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <button 
                            className="btn btn-success"
                            onClick={this.salvar}>Salvar</button>
                        <button 
                            className="btn btn-danger"
                            onClick={ e => this.props.history.push('/consulta-lancamentos') }>Cancelar</button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos);