import React from 'react';

import { Route, Switch, HashRouter } from 'react-router-dom';

//componentes
import Login from '../views/login';
import Cadastrousuario from '../views/cadastroUsuario';
import home from '../views/home';
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos';
import cadastroLancamentos from '../views/lancamentos/cadastro-lancamentos';

/*
no caso do '/cadastro-lancamentos/:lancamentoId'
você está dizendo que essa url pode também receber um 'id'.

Isso vai acontecer no caso de edição quando será passado o id
do lançamento que se deseja editar
*/
function Rotas() {
    return (
        <HashRouter>
            <switch>
                <Route path="/home" component={home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={Cadastrousuario} />
                <Route path="/consulta-lancamentos/" component={ConsultaLancamentos} />
                <Route path="/cadastro-lancamento" component={cadastroLancamentos} />
                <Route path="/editar-lancamento/:id" component={cadastroLancamentos} />
            </switch>
        </HashRouter>
    )
}

export default Rotas;