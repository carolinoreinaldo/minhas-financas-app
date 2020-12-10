import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';

import Login from './views/login';

class App extends React.Component {

  state = {
    nome: 'Douglas'
  }

  render() {
    return (
      <div>
        <Login />
      </div>

    )};
}

export default App;
