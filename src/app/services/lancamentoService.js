import ApiService from '../apiservice';
import ErroValidacao from './exception/ErroValidacao';

class LancamentoService extends ApiService {

    constructor() {
        super('/api/lancamentos');
    } 

    consultar(filtro) {
        let params = `?ano=${filtro.ano}`;

        if(filtro.mes) {
            params = `${params}&mes=${filtro.mes}`;
        }
        if(filtro.tipo) {
            params = `${params}&tipo=${filtro.tipo}`;
        }
        if(filtro.status) {
            params = `${params}&status=${filtro.status}`;
        }
        if(filtro.usuario) {
            params = `${params}&usuario=${filtro.usuario}`;
        }
        if(filtro.descricao) {
            params = `${params}&descricao=${filtro.descricao}`;
        }
        return super.get(params);
    }

    deletar(lancamentoId) {
        return super.delete(`/${lancamentoId}`);
    }

    obterListaDeTipos() {
        return super.get('/tipos-lancamento')
    }

    obterListaDeMeses() {
        return super.get('/meses');
    }

    salvar(lancamento) {
        return super.post('/', lancamento);
    }

    atualizar(lancamento) {
        return super.put(`/${lancamento.id}`, lancamento);
    }

    obterPorId(id) {
        return this.get(`/${id}`);
    }

    atualizarStatus(id, status) {
        return super.put(`/${id}/atualiza-status`, { status: status });
    }

    validar( lancamento ) {
        const erros = [];

        if(!lancamento.ano) {
            erros.push('Informe um ano.')
        }

        if(!lancamento.mes) {
            erros.push('Informe o mês')
        }

        if(!lancamento.descricao) {
            erros.push('Informe uma descrição');
        }

        if(!lancamento.tipo) {
            erros.push('Informe um tipo');
        }

        if(!lancamento.valor) {
            erros.push('Informe um valor');
        }

        if( erros && erros.length > 0) {
            throw new ErroValidacao( erros );
        }
    }
}

export default LancamentoService;