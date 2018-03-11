import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import DataTable from './containers/DataTable';

class App extends Component {

  render() {
    return (
      <div className="App">
        <DataTable/>
      </div>
    );
  }
}

export default App;
