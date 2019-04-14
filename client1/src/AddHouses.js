import React from 'react';




class AddHouses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      report: null,
    };
  }

  componentDidMount() {

    setInterval(() => {
      this.forceUpdate();
    }, 10000);
  }


  onSubmit = (event) => {
    event.preventDefault();
    // console.log(this.dataInput.value);


    fetch("/api/houses", {
      method: "POST",
      // mode: 'no-cors',
      body: this.dataInput.value,
      headers: { "content-type": "application/json" }
    })
      .then((res => res.json()))
      .then((data) => {
        if (data.error) {
          this.setState({ error: data.error })
        } else {

          this.state.report = data;
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
        {!!error && <div> error </div>}
      </form>
    );
  }
}

export default AddHouses;