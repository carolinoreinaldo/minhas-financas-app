import ApiService from '../apiservice';
import ErroValidacao from './exception/ErroValidacao';

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

    cadastrar(usuario) {
        return this.post('', usuario)
    }

    validar( usuario ) {

        const msgErros = [];

        if(!usuario.nome) {
            msgErros.push('O campo nome é obrigatório');
        }
        if(!usuario.email) {
            msgErros.push('O campo email é obrigatório');
        }else if ( !usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            msgErros.push('O email é inválido');
        }       
        if(!usuario.senha) {  
            msgErros.push('O campo senha é obrigatório');
        }
        if(!usuario.senhaRepeticao) {
            msgErros.push('É obrigatório repedir a senha');
        }
        if(usuario.senha !== usuario.senhaRepeticao) {
            msgErros.push('Os valoers para os campos senha e repetição da senha são diferentes');
        }

        if( msgErros && msgErros.length > 0 ) {
            throw new ErroValidacao( msgErros );
        }
    }
}

export default UsuarioService;