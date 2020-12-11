import React from 'react';

import { Route, Switch, HashRouter } from 'react-router-dom';

//componentes
import Login from '../views/login';
import Cadastrousuario from '../views/cadastroUsuario';
import home from '../views/home';

function Rotas() {
    return (
        <HashRouter>
            <switch>
                <Route path="/home" component={home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={Cadastrousuario} />
            </switch>
        </HashRouter>
    )
}

export default Rotas;