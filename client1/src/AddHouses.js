import React from 'react';



let report = null;

class AddHouses extends React.Component {

  state = {

    error: null

  };

  componentDidMount() {

    setInterval(() => {
      this.forceUpdate();
    }, 10000);
  }


  onSubmit = (event) => {
    event.preventDefault();
    // console.log(this.dataInput.value);


    fetch("http://localhost:8080/houses", {
      method: "POST",
      mode: 'no-cors',
      body: this.dataInput.value,
      headers: { "content-type": "api/json" }
    })
      .then((res => res.json()))
      .then((data) => {
        if (data.error) {
          this.setState({ error: data.error })
        } else {

          report = data;
          this.forceUpdate();
        }
      }).catch((err) => {
        this.setState({ error: err.massage });

      });
  };

  render() {
    console.count(`render`);

    const { error } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <textarea ref={(input) => this.dataInput = input} />
        <br />
        {this.state.error && <div>{this.state.error}<br /> </div>}

        <button type="submit">submit</button>
        <br />
        {!!report && <div> report </div>}
      </form>
    );
  }
}

export default AddHouses;