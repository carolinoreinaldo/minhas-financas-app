import LocalStorageService from './localStorageService';

export default class AuthService {

    static isUsuarioAutenticado() {

        const usuario = LocalStorageService.obterUsuarioLogado();
        console.log('usuario', usuario);
        
        const existeUsuario = (usuario && usuario.id != null);
        return existeUsuario;
    }

    static deslogarUsuario() {
        LocalStorageService.removerUsuarioLogado();
    }

    static logar(usuario) {
        LocalStorageService.adicionarUsuarioLogado(usuario);
    }
}