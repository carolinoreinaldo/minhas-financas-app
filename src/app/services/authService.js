import LocalStorageService from './localStorageService';

export default class AuthService {

    static isUsuarioAutenticado() {
        const usuario = LocalStorageService.obterUsuarioLogado();
        const existeUsuario = usuario && usuario.id;
        console.log('existeUsuairo',existeUsuario);
        return existeUsuario;
    }

    static deslogarUsuario() {
        LocalStorageService.removerUsuarioLogado();
    }
}