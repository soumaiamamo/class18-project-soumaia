import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./Home";
import ListHouses from "./ListHouses";
import Documentation from "./Documentation";
import AddHouses from './AddHouses';
import "./App.scss";
import "./Toggle.js";

// import HandleClick from './HandleClick';
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

        <Switch>

          <Route exact path="/" component={Home} />
          <Route path="/list/houses" component={ListHouses} />
          <Route path="/contribute" component={AddHouses} />
          <Route path="/documentation" component={Documentation} />

        </Switch>



        {/* </div>
 */}

      </Router >

    );
  }


}



export default App;



// <div className="mainPage">

// <ul className="mainUl">
//   <li className="mainli">
//     <Link to="/">home</Link>
//   </li>
//   <li className="mainli">
//     <Link to="/list/houses">houses</Link>
//   </li>
//   <li className="mainli">
//     <Link to="/contribute">contribute</Link>
//   </li>
//   <li className="mainli">
//     <Link to="/documentation"> documentation </Link>
//   </li>

// </ul>
