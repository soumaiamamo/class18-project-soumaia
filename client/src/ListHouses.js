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
        size_rooms: '1',
        price_min: 0,
        price_max: 10000000,
        city: "",
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





    // console.log(params)

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
      .join(`&`);

    if (updateUrl) {
      this.props.history.replace(this.props.location.pathname + '?' + queryString)
    }

    return fetch(`/api/houses/`)
      .then((res) => res.json())
      .then(({ houses, pageSize, total, error }) => {
        if (error) {
          this.setState({
            loading: false,
            error,
            houses: []
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
        page: 1,
      }
    },
      () => {
        this.fetchHouses(true)
      }

    )
    console.log(name, value)


  };


  render() {

    const {
      houses,
      error,
      loading,
      pageSize,
      total,
      searchCriteria: { price_min, price_max, city, order, page, size_rooms }
    } = this.state;




    const pages = Math.ceil(total / pageSize)

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
            size rooms : <br />

            <select
              name="size_rooms"
              value={size_rooms}
              onChange={this.handleInputChange}
            >
              <option value="allHouses">all houses</option>
              <option value="1">1 room</option>
              <option value="2">2 rooms</option>
              <option value="3">3 rooms</option>
              <option value="4_more">4 or more rooms</option>

              <br />


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



          {loading && <div> Loading...</div>}

          {error && <div>{error}</div>}


          {Array.from({ length: pages || 0 }, (value, index) => {

            const _page = index + 1;
            return (
              <div className={`${page == _page ? 'active' : ''} `}

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

          {houses.length == 0 ? (<div>No houses yet </div>) : (


            houses.map((houseObject) => (
              <div key={houseObject.id}>
                <Link to={`/houses/${houseObject.id}`}>
                  price :  {houseObject.price_value}<br />
                  country : {houseObject.location_country}<br />
                  city : {houseObject.location_city}<br />

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