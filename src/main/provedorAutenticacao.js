import React from 'react';
import AuthService from '../app/services/authService';

// Vai receber o contexto do React
export const AuthContext = React.createContext();

// Consumer
export const AuthConsumer = AuthContext.Consumer;

// Provider
export const AuthProvider = AuthContext.Provider;

class ProvedorAutenticacao extends React.Component {

    state = {
        usuarioAutenticado: null,
        isAutenticado: false
    }

    iniciarSessao = (usuario) => {
        AuthService.logar(usuario);
        this.setState({
            usuarioAutenticado: usuario,
            isAutenticado: true
        })
    }

    encerrarSessao = () => {
        AuthService.deslogarUsuario();
        this.setState({
            usuarioAutenticado: null,
            isAutenticado: false
        })
    }

    isUsuarioAutenticado = () => {
        return AuthService.isUsuarioAutenticado();
    }

    render() {

        const contexto = {
            usuarioAutenticado: this.state.usuarioAutenticado,
            isAutenticado: this.isUsuarioAutenticado(),
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao
        }

        return (
            <AuthProvider value={contexto}>
                {/* Aqui dentro vão estar todos os filhos interessados na informação do contexto*/}
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default ProvedorAutenticacao;