import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LancamentoService from '../../app/services/lancamentoService';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/SelectMenu';

class ConsultaLancamentos extends Component {

    constructor() {
        super()
        this.lancamentoService = new LancamentoService();
    }

    render() {

        const tipos = this.lancamentoService.obterListaDeTipos();
        
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
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputMes" label="Mês: *">
                            <input
                                type="text"
                                className="form-control"
                                id="MêsAno" />
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
                            <SelectMenu>

                            </SelectMenu>    
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputStatus" label="Status: *">
                            <SelectMenu>
                                
                            </SelectMenu>    
                        </FormGroup>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);