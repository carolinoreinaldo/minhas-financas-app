import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LancamentoService from '../../app/services/lancamentoService';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/SelectMenu';

// toastr para mostrar mensagens para o usuário
// '* as message' significa import dudo que está dentro de toastr
import {mensagemErro} from '../../components/toastr';


class ConsultaLancamentos extends Component {

    constructor() {
        super()
        this.lancamentoService = new LancamentoService();
    }

    state = {
        tipo: '',
        mes: '',
        tipos: [],
        meses: []
    }

    componentDidMount() {
        this.lancamentoService.obterListaDeTipos()
            .then( response => {
                let tiposFormatado = response.data.map( tipo => {
                    return {label: tipo, value:tipo}
                })

                tiposFormatado = [{label:'Selecione ...', value:''}, ...tiposFormatado];
                this.setState({tipos : tiposFormatado})
            }).catch( error => {
                mensagemErro(error)
            });
        
        this.lancamentoService.obterListaDeMeses()
            .then( response => {
                const mesesBackEnd = [{label:'Selecione ...', value:''}, ...response.data]
                this.setState({meses : mesesBackEnd})
            }).catch( error => {
                mensagemErro(error)
            });
    }

    render() {
  
        return (
            <Card>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                            <input
                                type="text"
                                className="form-control"
                                id="inputDescricao"
                                placeholder="Descrição" />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input
                                type="text"
                                className="form-control"
                                id="inputAno" />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputMes" label="Mês: *">
                            <SelectMenu
                                lista={this.state.meses}
                                className="form-control"
                                id="inputMes"
                                value={this.state.mes}
                                onChange={(e) => this.setState({ mes: e.target.value })} />
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
                                placeholder="Ex.: 46,75" />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputTipo" label="Tipo: *">
                            <SelectMenu
                                lista={this.state.tipos}
                                className="form-control"
                                id="inputTipo"
                                value={this.state.tipo}
                                onChange={(e) => this.setState({ tipo: e.target.value })} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputStatus" label="Status:">
                            <input
                                type="text"
                                className="form-control"
                                id="StatusAno"
                                disabled />
                        </FormGroup>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);