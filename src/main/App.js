import React from 'react';

// css
import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css';

// biblioteca de mensagens
import 'toastr/build/toastr.css';

// custom componentes
import Rotas from './rotas';
import Navbar from '../components/navbar';

// biblioteca para mostrar mensagens de sucesso
// e erro para usuário
import 'toastr/build/toastr.min.js';

// import do prime react
import 'primereact/resources/themes/fluent-light/theme.css'
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// import do botao
import { Button } from 'primereact/button';
import ProvedorAutenticacao from './provedorAutenticacao';

class App extends React.Component {

  state = {
    nome: 'Douglas'
  }

  render() {
    return (
      <ProvedorAutenticacao>
        <Navbar />
        <div className="container">
          <Rotas />
        </div>
      </ProvedorAutenticacao>
    )
  };
}

export default App;
