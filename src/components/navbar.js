import React from 'react';
import AuthService from '../app/services/authService';

//custom components
import NavbarItem from '../components/navbaritem';

const deslogar = () => {
    AuthService.deslogarUsuario()
}

const isUsuarioAutenticado = () => {
    return AuthService.isUsuarioAutenticado();
}

function Navbar() {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="#/home" className="navbar-brand">Minhas Finanças</a>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarResponsive" 
                    aria-controls="navbarResponsive" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem 
                            render={isUsuarioAutenticado()} 
                            label="Home" link="#/home" />
                        <NavbarItem 
                            label="Cadastro" 
                            link="#/cadastro-usuarios" />
                        <NavbarItem 
                            render={isUsuarioAutenticado()}  
                            label="Lançamentos" 
                            link="#/consulta-lancamentos" />
                        <NavbarItem 
                            render={isUsuarioAutenticado()}  
                            label="Sair" 
                            link="#/login" 
                            onClick={deslogar}/>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Navbar;