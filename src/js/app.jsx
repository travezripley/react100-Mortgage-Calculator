import React from 'react';
import '../css/style.less';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: '',
      rate: '',
      term: '',
      payment: ''
    };

        // event binding for updating state values
    this.updateBalance = this.updateBalance.bind(this);
    this.updateRate = this.updateRate.bind(this);
    this.updateTerm = this.updateTerm.bind(this);
    this.calculate = this.calculate.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  calculate(balance, rate, term) {
    const n = term * 12;
    const r = rate / 100 / 12;
    const numerator = r * (1 + r) ** n;
    const denominator = (1 + r) ** n - 1;

    return parseFloat(balance * (numerator / denominator)).toFixed(2);
  }

  handleClick(e) {
    e.preventDefault();

    const balance = this.state.balance;
    const rate = this.state.rate;
    const term = this.state.term;

    const payment = this.calculate(balance, rate, term);
        // Now set the value so that the user will see the result
    this.setState({
      payment: `$${payment} is your monthly payment.`
    });
  }

  render() {
    return (
      <div className='container'>
        <form className='form-horizontal'>
          <div className='col-md-2' />
          <div className='page-header'>
            <h3>Mortgage Calculator</h3>
          </div>
          <div className='form-group'>
            <label htmlFor='balance' className='col-md-2 control-label'>
                            Loan Balance
                        </label>
            <div className='col-md-5'>
              <input
                name='balance'
                value={ this.state.balance }
                onChange={ this.updateBalance }
                className='form-control input-md'
                type='number'
                size='1'
                placeholder='0'
              />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='rate' className='col-md-2 control-label'>
                            Interest Rate (%)
                        </label>
            <div className='col-md-5'>
              <input
                name='rate'
                value={ this.state.rate }
                onChange={ this.updateRate }
                className='form-control input-md'
                type='number'
                step='0.01'
                size='1'
                placeholder='0'
              />
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='term' className='col-md-2 control-label'>
                            Loan Term (years)
                        </label>

            <select
              name='term'
              type='number'
              value={ this.state.term }
              onChange={ this.updateTerm }
              className='form-control'
            >
              <option value='0'>0</option>
              <option value='15'>15</option>
              <option value='30'>30</option>
            </select>
          </div>

          <div className='form-group'>
            <div className='col-md-offset-2 col-md-10'>
              <button
                name='submit'
                className='btn btn-primary'
                onClick={ this.handleClick }
              >
                                Calculate
                            </button>
            </div>
          </div>
          <div id='output' name='output' className='d-print-inline-block'>
            <p>{this.state.payment}</p>
          </div>
        </form>
      </div>
    );
  }
}
