import React from 'react';

let report = null;


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


    fetch(`/houses`, {
      method: 'POST',
      mode: 'no-cors',
      body: this.dataInput.value,
      headers: { 'content-type': 'application/json' }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {

          this.setState({ error: null, report: data });

          // this.state.report = data;
          // this.forceUpdate();
        }
      })
      .catch((err) => {
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

        {!!report && <Report report={report} />}

        {!!error && <div> error </div>}

      </form>

    );
  }
}


const Report = ({ report }) => (

  <div>

    valid houses : {report.valid}
    <br />
    invalid houses ({report.invalid.length}):{''}
    {report.invalid.map((data) => (
      <div>
        message : <pre> {JSON.stringify(data.errors, null, 2)}</pre>
        raw : <pre>{JSON.stringify(data.raw, null, 2)} </pre>

      </div>
    ))}

  </div>
)

export default AddHouses;