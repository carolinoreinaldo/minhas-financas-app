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

//import do prime react
import 'primereact/resources/themes/fluent-light/theme.css'

class App extends React.Component {

  state = {
    nome: 'Douglas'
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <Rotas />
        </div>
      </>
    )};
}

export default App;
