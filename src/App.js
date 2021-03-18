import { React, Component } from "react";
import './App.css';
import Pratos from './components/Pratos';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Pratos/>
      </div>
    );
  }
}

export default App;
