
// import React from 'react';
// import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import ListHouses from "./ListHouses";
// import Documentation from "./Documentation";
// import AddHouses from './AddHouses';
// import "./App.scss"
// import "./App.js"


// class HandleClick extends Component {

//   toggle = () => {
//     var e = document.getElementsByClassName(mainPage);
//     if (e.style.display == 'block')
//       e.style.display = 'none';
//     else
//       e.style.display = 'block';
//   }



//   // constructor(props) {
//   //   super(props);
//   //   state = {
//   //     display: block,

//   //   }
//   // }

//   // handleClick = () => {
//   //   if (display === block) {
//   //     this.setState({
//   //       display: block,
//   //     })

//   //   } else {

//   //     this.setState({
//   //       display: none,
//   //     })
//   //   }
//   // }
//   render() {
//     return (

//       <Router>
//         <div className="mainPage">

//           <ul className="mainUl">
//             <li className="mainli">
//               <Link to="/">home</Link>
//             </li>
//             <li className="mainli">
//               <Link to="/list/houses">houses</Link>
//             </li>
//             <li className="mainli">
//               <Link to="/contribute">contribute</Link>
//             </li>
//             <li className="mainli">
//               <Link to="/documentation"> documentation </Link>
//             </li>

//           </ul>

//           <Switch>

//             <Route exact path="/" component={Home} />
//             <Route path="/list/houses" component={ListHouses} />
//             <Route path="/contribute" component={AddHouses} />
//             <Route path="/documentation" component={Documentation} />

//           </Switch>


//         </div>


//       </Router >
//     )
//   }
// }

// export default HandleClick;