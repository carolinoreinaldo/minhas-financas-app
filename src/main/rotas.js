import React from 'react';

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';

//componentes
import Login from '../views/login';
import Cadastrousuario from '../views/cadastroUsuario';
import home from '../views/home';
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos';
import cadastroLancamentos from '../views/lancamentos/cadastro-lancamentos';
import AuthService from '../app/services/authService';

const isUsuarioAutenticado = () => {
    return AuthService.isUsuarioAutenticado();
}

/*
{component: Component} -> Significa que vc está usando o operador
'destructuring para pegar somente a propriedade component e 
:Component é um aliás que vc está fazendo para esse componente'
----------------------------------------------------------------------
O 'render' dentro de Route é outra forma de passar o componente que
queremos renderizar, dentro do render podemos passar instruções e
condições para renderizar um componente
----------------------------------------------------------------------
...componentProps é a mesma coisa que ...props, a diferença abaixo é que
o componentProps é uma forma de repassar o ...props
*/
function RotaAutenticada({ component: Component, ...props }) {

    return (
        //aqui componentProps está apenas repassando o ...props para frente
        <Route {...props} render={ componentProps => {

            if (isUsuarioAutenticado()) {
                return (
                    <Component {...componentProps} />
                )
            } 
            else {
                return (
                    <Redirect to={
                        {
                            pathname: '/login',
                            state: {
                                from: componentProps.location
                            }
                        }
                    } />
                )
            }
        }}
        />
    )
}

/*
no caso do '/cadastro-lancamentos/:lancamentoId'
você está dizendo que essa url pode também receber um 'id'.

Isso vai acontecer no caso de edição quando será passado o id
do lançamento que se deseja editar

#Passando parâmetros : 
Nota : deve-se usar o '?' depois do parâmetro para indicar ao sistema
que o parâmetro id é opcional
*/
function Rotas() {
    return (
        <HashRouter>
            <switch>
                <Route
                    path="/login"
                    component={Login} />
                <Route
                    path="/cadastro-usuarios"
                    component={Cadastrousuario} />

                <RotaAutenticada
                    path="/home"
                    component={home} />
                <RotaAutenticada
                    path="/consulta-lancamentos/"
                    component={ConsultaLancamentos} />
                <RotaAutenticada
                    path="/cadastro-lancamentos/:id?"
                    component={cadastroLancamentos} />
            </switch>
        </HashRouter>
    )
}

export default Rotas;