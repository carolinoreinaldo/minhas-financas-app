export const CHAVE_USUARIO_LOGADO = '_usuario_logado';

class LocalStorageService {


    static adicionarItem(chave, valor) {
        const valorString = JSON.stringify(valor);
        localStorage.setItem(chave, valorString)
    }

    static obterItem(chave) {
        const itemString = localStorage.getItem(chave);
        return JSON.parse(itemString);
    }

    static adicionarUsuarioLogado(usuario) {
        const usuarioString = JSON.stringify(usuario);
        localStorage.setItem(CHAVE_USUARIO_LOGADO, usuarioString);
    }
    static obterUsuarioLogado() {
        return this.obterItem(CHAVE_USUARIO_LOGADO);
    }

    static removerUsuarioLogado() {
        localStorage.removeItem(CHAVE_USUARIO_LOGADO);
    }


}

export default LocalStorageService;