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
      balance: e.target.value
    });
  }
  updateTerm(e) {
    this.setState({
      balance: e.target.value
    });
  }

}

//the equation
calculate(balance, rate, term) {
  let n = term * 12;
  let r = (rate / 100) / 12;
  let numerator = r * (1 + r) ** n;
  let denominator = ((1 + r) ** n) - 1;

  return parseFloat(balance * (numerator / denominator)).toFixed(2);
  
}



handleClick(e){
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
        <h3>Mortgage Calculator</h3>
        <div className="row">


          {/* loan balance form */}
          <div className="col-md-1 form-group">
            <label htmlfor="balance"> Loan Balance: </label>
            <input name="balance" type="number" className="form-control" />
          </div>

          {/* interest rate form */}
          <div className='col-md-1 form-group'>
            <label htmlfor="rate"> Interest Rate (%): </label>
            <input name="rate" type="number" className="form-control" />
          </div>

          {/* term form */}
          <div className='col-md-1 form-group'>
            <label htmlfor="term"> Loan Term(Years): </label>
            <select name="term" type="number" className="form-control" >
              <option value="15">15</option>
              <option value="30">30</option>
            </select>
          </div>

          {/* button */}
          <div className="form-group">
          <div className="col-md-offset-2 col-md-10">
            <button name="submit" 
            className="btn btn-primary btn-block" 
            onClick={this.handleClick}> Calculate </button>
          </div>
         </div>


          {/* output */}
          <div className='col-md-1' id="output">
            <h4 className="text-center font-weight-bold text-primary"> Monthly Payment: </h4>
          </div>


        </div>
      </div>
    );
  }

            



