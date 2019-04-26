import React from 'react';

import { Link } from 'react-router-dom';


class ListHouses extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      houses: [],
      error: null,
      loading: false,
      searchCriteria: {
        price_min: 0,
        price_max: 10000000,
        city: "",
        order: "location_country_asc",
        page: 1
      }

    };
  }
  componentDidMount() {
    this.setState({
      error: null,
      loading: true
    });

    this.fetchHouses();
  };


  fetchHouses = () => {


    const { searchCriteria } = this.state;


    const queryString = Object.keys(searchCriteria)
      .reduce((query, field) => {
        const val = searchCriteria[field];

        if (val !== null && val !== '') {

          query.push(`${field} =${encodeURI(val)}`);
        }
        return query;

      }, [])
      .join(`&`);




    return fetch(`/houses?${queryString}`)
      .then((res) => res.json())
      .then((housesList) =>

        this.setState({
          houses: housesList,
          error: null,
          loading: false,
        })
      )
      .catch(() =>
        this.setState({
          error: 'Something went wrong .. ',
          loading: false
        })
      )


  }


  handleInputChange = (e) => {

    const { name, value } = e.target;

    this.state({
      ...this.state,
      searchCriteria: {
        ...this.state.searchCriteria,
        [name]: value
      }
    }, this.fetchHouses);


    console.log(name, value)

  }

  render() {

    const {
      houses,
      error,
      loading,
      searchCriteria: { price_min, price_max, city, order, page }
    } = this.state;


    console.log(houses, price_max, price_min, order);


    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>{error}</div>;
    }


    if (!houses.length) {

      return <h2>No houses yet </h2>;
    } else {

      return (
        <form>
          <div>
            <label>
              price min :  <br />


              <select name="price_min" value={price_min} onChange={this.handleInputChange}>

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
              price max :  <br />


              <select name="price_max" value={price_max} onChange={this.handleInputChange}>


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
              City :  <br />


              <select name="City" value={city} onChange={this.handleInputChange}>


                <option value="" >select city</option>
                <option value="syria">syria</option>

              </select>
            </label>
          </div>


          <div>
            <label>
              Order :  <br />


              <select name="Order" value={order} onChange={this.handleInputChange}>


                <option value="location_country_asc" >City ASC</option>
                <option value="location_country_desc" >City DESC</option>
                <option value="price_value_asc" >Price ASC</option>
                <option value="price_value_desc" >Price DESC</option>
              </select>
            </label>
          </div>






          <div>

            {houses.map((houseObject) => (
              <div key={houseObject.id}>
                <Link to={`/houses/${houseObject.id}`}>
                  price :  {houseObject.price_value}
                </Link>
              </div>
            ))}


          </div >
        </form >



      )
    }

  }
}


export default ListHouses;
