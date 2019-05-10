import React from 'react';
import "./App.scss"

import { Link } from 'react-router-dom';


class ListHouses extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      houses: [],
      error: null,
      loading: false,
      searchCriteria: {
        size_rooms: '',
        price_min: 0,
        price_max: 10000000,
        location_city: "",
        order: "location_country_asc",
        page: 1
      },
    };
  }
  componentDidMount() {

    const params = this.props.location.search
      .replace(/^\?/, '')
      .split('&')
      .filter(el => el.length)
      .map((pair) => pair
        .split('='))
      .reduce((params, [name, value]) => {
        params[name] = value;
        return params;
      }, {});


    this.setState({
      error: null,
      loading: true,
      searchCriteria: {
        ...this.state.searchCriteria,
        ...params,
      },
    },
      this.fetchHouses
    );
  };


  fetchHouses(updateUrl = false) {


    const { searchCriteria } = this.state;


    const queryString = Object.keys(searchCriteria)
      .reduce((query, field) => {
        const val = searchCriteria[field];

        if (val !== null && val !== '') {

          query.push(`${field}=${encodeURI(val)}`);
        }
        return query;

      }, [])
      .join('&');

    if (updateUrl) {
      this.props.history.replace(this.props.location.pathname + '?' + queryString)
    }

    fetch(`/api/houses?/${queryString}`)

      .then((res) => res.json())
      .then(({ houses, pageSize, total, error }) => {
        if (error) {
          this.setState({
            loading: false,
            error: error,
            houses: [],
            total: 0,
          })
        } else {
          this.setState({
            houses,
            total,
            pageSize,
            error: null,
            loading: false,
          })
        }
      })
      .catch(() =>
        this.setState({
          error: 'Something went wrong .. ',
          loading: false
        })
      )
  }



  handleInputChange = (e) => {

    const { name, value } = e.target;

    this.setState({
      ...this.state,
      searchCriteria: {
        ...this.state.searchCriteria,
        [name]: value,
        page: 1
      }
    },
      () => {
        this.fetchHouses(true)
      }

    )
    // console.log(name, value)
  };

  render() {

    let {
      houses,
      error,
      loading,
      pageSize,
      total,
      searchCriteria: {
        price_min,
        price_max,
        city,
        size_rooms,
        order,
        page,
      }
    } = this.state;




    const pages = Math.ceil(total / pageSize)
    page = parseInt(page, 10);

    return (
      <form  >
        <div className="mainList">
          <div className="listPage">
            <label >
              Price min   <br />
              <select className="price" name="price_min" value={price_min} onChange={this.handleInputChange}>

                <option value="0">0</option>
                <option value="50000">50000</option>
                <option value="100000">100000</option>
                <option value="15000">150000</option>
                <option value="20000">200000</option>
                <option value="50000">500000</option>

              </select>
            </label>
          </div>

          <div>
            <label>
              Price max   <br />


              <select className="priceMax" name="price_max" value={price_max} onChange={this.handleInputChange}>


                <option value="500000">500000</option>
                <option value="1000000">1000000</option>
                <option value="1500000">1500000</option>
                <option value="200000">200000</option>
                <option value="5000000">5000000</option>
                <option value="10000000">10000000</option>

              </select>
            </label>
          </div>




          <div>
            <label>
              City   <br />
              <select className="city" name="location_city" value={city} onChange={this.handleInputChange}>

                <option value="" >select city</option>
                <option value="damascus">damascus</option>
                <option value="homs">homs</option>
                <option value="aleppo">aleppo</option>
                <option value="qamshli">qamshli</option>
                <option value="hasaka">hasaka</option>

              </select>
            </label>
          </div>


          <div>
            <label>
              Order   <br />


              <select className="order" name="order" value={order} onChange={this.handleInputChange}>

                <option value="location_city_asc" >City ASC</option>
                <option value="location_city_desc" >City DESC</option>
                <option value="price_value_asc" >Price ASC</option>
                <option value="price_value_desc" >Price DESC</option>
              </select>
            </label>
          </div>

          <div>
            <label>
              Size rooms  <br />


              <select className="room" name="size_rooms" value={size_rooms} onChange={this.handleInputChange}>

                <option value="">All houses</option>
                <option value="1">one room</option>
                <option value="2">two rooms</option>
                <option value="3">three rooms</option>
                <option value="+4">four or more rooms</option>


              </select>
            </label>
          </div>



          <div className="page">


            {loading && <div> Loading...</div>}

            {error && <div>{error}</div>}


            {Array.from({ length: pages || 0 }, (value, index) => {

              const _page = index + 1;

              return (
                <div id="page" className={page === _page ? 'active' : ''}

                  onClick={() => {
                    this.setState({
                      ...this.state,
                      searchCriteria: {
                        ...this.state.searchCriteria,
                        page: _page,

                      },

                    },

                      () => this.fetchHouses(true)

                      // console.log('set page', _page)

                    );
                  }}

                >

                  {_page}


                </div>
              );


            })}
            <br />
            <br />
          </div>

          {houses.length === 0 ? (<div>No houses yet </div>) : (


            houses.map((houseObject) => (
              <div className="houses" key={houseObject.id}>
                <Link to={`/houses/${houseObject.id}`}>

                  <ul className="houseUl">
                    <li className="houseli"> Price :  {houseObject.price_value}</li>
                    <li className="houseli">Country : {houseObject.location_country}</li>
                    <li className="houseli">City : {houseObject.location_city}</li>
                    <li className="houseli">Size rooms: {houseObject.size_rooms}</li>

                  </ul>

                </Link>
              </div>
            ))
          )}

        </div>

      </form >



    );

  }

}



export default ListHouses;