import ApiService from '../apiservice';

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
}

export default LancamentoService;