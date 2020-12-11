import React from 'react';

//css
import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css';

//custom componentes
import Rotas from './rotas';
import Navbar from '../components/navbar';

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
