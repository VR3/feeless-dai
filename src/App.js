import React, { Component } from 'react';
import './App.css';
import { MainCard } from './components'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <MainCard />
        </header>
      </div>
    );
  }
}

export default App;
