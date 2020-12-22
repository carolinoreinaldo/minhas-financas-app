import LocalStorageService from './localStorageService';

export default class AuthService {

    static isUsuarioAutenticado() {
        const usuario = LocalStorageService.obterUsuarioLogado();
        const existeUsuario = usuario && usuario.id;
        console.log('existe usuario', existeUsuario);
    }

    static deslogarUsuario() {
        LocalStorageService.removerUsuarioLogado();
    }
}