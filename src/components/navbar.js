import React from 'react';

//custom components
import NavbarItem from '../components/navbaritem';

function Navbar() {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="#/home" className="navbar-brand">Minhas Finanças</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem label="Home" link="#/home" />
                        <NavbarItem label="Cadastro" link="#/cadastro-usuarios" />
                        <NavbarItem label="Lançamentos" link="#/consulta-lancamentos" />
                        <NavbarItem label="Login" link="#/login" />
                    </ul>

                </div>
            </div>
        </div>

    )
}

export default Navbar;