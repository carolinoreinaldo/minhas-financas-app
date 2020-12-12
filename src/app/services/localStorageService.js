class LocalStorageService {

    static chaveUsuarioLogado = '_usuario_logado';

    static adicionarItem(chave, valor) {
        const valorString = JSON.stringify(valor);
        localStorage.setItem(chave, valorString)
    }

    static obterItem(chave) {
        const itemString = localStorage.getItem(chave);
        return JSON.parse(itemString);
    }


}

export default LocalStorageService;