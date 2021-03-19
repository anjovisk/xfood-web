import { React, Component } from "react";
import './App.css';
import FoodList from './components/FoodList';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FoodList/>
      </div>
    );
  }
}

export default App;
