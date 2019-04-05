import React, { Component } from 'react';
import { Router, Route, link } from 'react-router-dom';
import Home from "./Home";
import ListHouses from "./ListHouses";
import Contribute from "./Contribute";
import HouseVieuw from "./HouseVieuw";
class App extends Component {

  render() {
    return (

      <Router>
        <div>

          <Route path="/home" Component={Home} />
          <Route exact path="/List/houses" Component={ListHouses} />
          <Route exact path="/Contribute" Component={Contribute} />
          <Route exact path="/house/vieuw" Component={HouseVieuw} />

        </div>


      </Router>




    );
  }
}


export default App;
