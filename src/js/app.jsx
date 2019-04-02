import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here
 
  constructor(props) {
    super(props);
    //setting initial state
    this.state = {
      balance: "",
      rate: "",
      term: "",
      payment: ""
    };

    //event binding for updating state values
    this.updateBalance = this.updateBalance.bind(this);
    this.updateRate = this.updateRate.bind(this);
    this.updateTerm = this.updateTerm.bind(this);

    //event binding for creating calculations
    this.calculate = this.calculate.bind(this);
    this.handleClick = this.handleClick.bind(this); //

  }

  updateBalance(e) {
    this.setState({
      balance: e.target.value
    });
  }

  updateRate(e) {
    this.setState({
      rate: e.target.value
    });
  }
  updateTerm(e) {
    this.setState({
      term: e.target.value
    });
  }



//the equation
calculate(balance, rate, term) {
  let n = term * 12;
  let r = (rate / 100) / 12;
  let numerator = r * (1 + r) ** n;
  let denominator = ((1 + r) ** n) - 1;

  return parseFloat(balance * (numerator / denominator)).toFixed(2);
}
handleClick(e) {
  e.preventDefault();
  //console.log('handleClick()');

  let balance = this.state.balance;
  let rate = this.state.rate;
  let term = this.state.term;

  let payment = this.calculate(balance, rate, term);

  //The set value so the user will see the results
  this.setState({
    payment: '$' + payment + ' is your monthly payment.'
  });
}
  


render() {
  return (

    <div className="container">
      {
        <form className="form-horizontal">
          <div className="col-md-2">
          </div>

          <div className="page-header">
            <h3>Mortgage Calculator</h3>
          </div>

            {/* loan balance form */}
            <div className="form-group">
              <label for="balance" className="col-md-2 control-label"> Loan Balance: </label>
              <div className="col-md-5">
                <input
                  name="balance"
                  value={this.state.balance}
                  onChange={this.updateBalance}
                  className="form-control input-md"
                  type="number"
                  size="1"
                  placeholder="0" />
              </div>
            </div>

          {/* interest rate form */}
          <div className="form-group">
            <label for="rate" className="col-md-2 control-label">Interest Rate (%): </label>
            <div className="col-ms-5">
              <input
                name="rate"
                value={this.state.rate}
                onChange={this.updateRate}
                className="form-control input-md"
                type="number"
                step="0.01"
                size="1"
                placeholder="0" />
            </div>
          </div>

          {/* term form */}
          <div className='form-group'>
            <label for="term" className="col-md-2 control-label"> Loan Term (Years): </label>
            <div className="col-md-5">
              <select
                name="term"
                value={this.state.term}
                onChange={this.updateTerm}
                className="form-control input-md"
                type="number"
                size="1">
                <option value="0">0</option>
                <option value="15">15</option>
                <option value="30">30</option>
              </select>
            </div>
          </div>

            {/* button */}
            <div className="form-group">
              <div className="col-md-offset-2 col-md-10">
                <button
                  name="submit"
                  className="btn btn-primary btn-block"
                  onClick={this.handleClick}> Calculate </button>
              </div>
            </div>

            {/* output */}
            <div id="output"
              name="output"
              className="d-print-inline-block"><p>{this.state.payment}</p>
            </div>
          </form>
      }
      </div>
    );
  }
}
            
    



