import ApiService from '../apiservice';

class UsuarioService extends ApiService {

    constructor() {
        super('/api/usuarios');
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais);
    }

    obterSaldo(id) {
        const url = `/${id}/saldo`;
        return this.get(url);
    }
}

export default UsuarioService;