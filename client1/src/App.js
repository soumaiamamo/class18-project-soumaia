import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./Home";
import ListHouses from "./ListHouses";
import Contribute from "./Contribute";
import HouseVieuw from "./HouseVieuw";
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
        <div>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="houses">houses</Link>
            </li>
            <li>
              <Link to="/contribute">contribute</Link>
            </li>
            <li>
              <Link to="/house/vieuw"> House Vieuw</Link>

            </li>
          </ul>

          <Switch>

            <Route exact path="/" component={Home} />
            <Route path="/list/houses" component={ListHouses} />
            <Route path="/contribute" component={Contribute} />
            <Route path="/house/vieuw" component={HouseVieuw} />

          </Switch>


        </div>


      </Router>

    );
  }
}



export default App;
