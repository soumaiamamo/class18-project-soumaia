import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./Home";
import ListHouses from "./ListHouses";
import HouseView from "./HouseView";
import AddHouses from './AddHouses';
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
              <Link to="/houses">houses</Link>
            </li>
            <li>
              <Link to="/contribute">contribute</Link>
            </li>
            <li>
              <Link to="/house/view"> House Vieuw</Link>

            </li>
          </ul>

          <Switch>

            <Route exact path="/" component={Home} />
            <Route path="/list/houses" component={ListHouses} />
<<<<<<< HEAD
            <Route path="/contribute" component={AddHouses} />
            <Route path="/house/view" component={HouseView} />
=======
            <Route path="/contribute" component={Contribute} />
            <Route path="/house/vieuw" component={HouseVieuw} />
>>>>>>> 32a02cbcf2b6c24af7847bd08e6ca995166c2036

          </Switch>


        </div>


      </Router>

    );
  }
}



export default App;
