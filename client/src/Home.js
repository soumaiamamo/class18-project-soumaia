
import React from 'react';
//import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import ListHouses from "./ListHouses";
// import Documentation from "./Documentation";
// import AddHouses from './AddHouses';
import "./App.scss"
import "./App.js"




class Home extends React.Component {


  myFunction = () => {

    console.log("click submit");
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }


  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     cl


  //   };
  //   onClick = () => {
  //     var x = document.getElementById("myTopnav");
  //     if (x.className === "topnav") {
  //       x.className += " responsive";
  //     } else {
  //       x.className = "topnav";
  //     }
  //   }
  // }



  render() {

    return (
      <div>

        {/* <div class="topnav" id="myTopnav">
          <a href="/" class="active">home</a>
          <a href="/list/houses">houses</a>
          <a href="/contribute">contribute</a>
          <a href="/documentation">documentation</a>
          <a href="javascript:void(0);" class="icon" onclick={this.onClick}>
            <i class="fa fa-bars"></i>
          </a>
        </div> */}


        <div class="topnav" id="myTopnav">
          <a href="/" class="active">home</a>
          <a href="/list/houses">houses</a>
          <a href="/contribute">contribute</a>
          <a href="/documentation">documentation</a>
          <a href="javascript:void(0);" class="icon" onClick={this.myFunction}>
            <i class="fa fa-bars"></i>
          </a>
        </div>

        <div className="header">

          <img className="background_img" src={require("./assets/multiple-houses.jpeg")} alt="multiple-houses" />

          <div className="top_paragraph_div">
            <h1 className="homePage">HackYourEstate</h1>
            <h2 className="top_paragraph">A REST API for finding,
          uploading and <br /> selling houses<br />
            </h2>
          </div>



          <img className="threelines" src={require("./assets/threelines.png")} alt="threelines" onClick={this.handleClick} />

        </div>
        <div className="blue_div">
          <h1 className="title">Features</h1>
          <div className="features">
            <div className="features_part" >
              <img className="features_img" src={require('./assets/seach-house-icon.png')} alt="seach-house-icon" />
              <h2 className="paragraph">Search for houses</h2>
            </div>
            <div className="features_part">
              <img className="features_img" src={require('./assets/upload-data-icon.svg')} alt="upload-data-icon" />
              <h2 className="paragraph">Upload house data</h2>
            </div >
            <div className="features_part">
              <img className="features_img" src={require('./assets/contribute.png')} alt="contribute" />
              <h2 className="paragraph">Contribute to API</h2>
            </div>
          </div>
        </div>
        <h1 className="title">Benefits</h1>

        <div className="benefits_div">
          <div className="benefits_img_div">
            <img className="benefits_img" src={require('./assets/easy-to-use.png')} alt="easy-to-use" />
            <img className="benefits_img" src={require('./assets/open-source.png')} alt="open-source" />
            <img className="benefits_img" src={require('./assets/catalog.png')} alt="catalog" />
          </div>
          <div className="benefits_p">
            <h2 className="benefits">Easy to use </h2>
            <h3 className="benefits_paragraph">Find or upload in a matter of clicks</h3>

            <br />
            <h2 className="benefits">Open-source </h2>
            <h3 className="benefits_paragraph">Feel like the API is incomplete? Feel free to contribute!</h3>
            <br />
            <h2 className="benefits">Extensive catalog</h2>
            <h3 className="benefits_paragraph">Find your dream house in no time</h3>
            <br />
          </div>
        </div>


        <div className="blue_div">
          <br />
          <h1 className="title">Written in…</h1>


          <img className="written_img" src={require('./assets/mysql-icon.svg')} alt="mysql-icon" />
          <img className="written_img" src={require('./assets/nodejs-icon.png')} alt="nodejs-icon" />
          <img className="written_img" src={require('./assets/reactjs-icon.png')} alt="reactjs-icon" />
        </div>
        <div className="bottom">
          <h1 className="bottom_title">What are you waiting for?</h1>
          <h2 className="bottom_paragraph">Find your nexthouse, or go contribute!</h2>
          <br />
        </div>
        <h1 className="copyright">© Copyright by HackYourFuture 2019</h1>

      </div>)
  }
}

export default Home;
