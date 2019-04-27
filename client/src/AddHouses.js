import React from 'react';
import "./App.css"


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
    }, 50000);
  }


  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.dataInput.value);


    fetch('/api/houses', {
      method: 'POST',
      //  mode: 'no-cors',
      headers: { 'content-type': 'application/json' },
      body: this.dataInput.value
    })
      .then((res) => res.json())

      .then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {

          this.setState({ error: null, report: data });

          this.state.report = data;
          this.forceUpdate();
        }
      })
      .catch((err) => {
        this.setState({ error: err.massage })

      });
  };


  render() {
    console.count(`render`);

    const { error, report } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <textarea className="contribute" ref={input => (this.dataInput = input)} />
        <br />

        {/* {this.state.error && <div>{this.state.error}<br /> 
    </div>} */}

        {error && <div>{error}</div>}


        <button className="submit" type="submit">Submit</button>
        <br />

        {!!report && <Report report={report} />}

      </form>

    );
  }
}


let Report = ({ report }) => (


  <div>

    valid houses : {report.valid}
    <br />
    invalid houses :  {report.invalid.length}

    {report.invalid.map((data) => (
      <div>
        <br />
        message :{''}
        <pre> {JSON.stringify(data.errors, null, 2)}</pre>
        raw : <pre>{JSON.stringify(data.raw, null, 2)} </pre>

      </div>
    ))}

  </div>
);

export default AddHouses;