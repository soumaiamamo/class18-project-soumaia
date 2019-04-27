import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./Home";
import ListHouses from "./ListHouses";
import HouseView from "./HouseView";
import AddHouses from './AddHouses';
import "./App.css"
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: [],
    }
  }
  render() {

    return (

      <Router>
        <div className="mainPage">

          <ul className="mainUl">
            <li className="mainli">
              <Link to="/">Home</Link>
            </li>
            <li className="mainli">
              <Link to="/list/houses">houses</Link>
            </li>
            <li className="mainli">
              <Link to="/contribute">contribute</Link>
            </li>
            <li className="mainli">
              <Link to="/house/view"> House Vieuw</Link>
            </li>

          </ul>

          <Switch>

            <Route exact path="/" component={Home} />
            <Route path="/list/houses" component={ListHouses} />
            <Route path="/contribute" component={AddHouses} />
            <Route path="/house/view" component={HouseView} />

          </Switch>


        </div>


      </Router>

    );
  }
}



export default App;
