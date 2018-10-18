import React, { Component } from 'react';
import './App.css';
import { MainCard } from './components';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';

const styleTL = {
  position: 'absolute',
  top: '30px',
  left: '40px',
}

const styleTR = {
  position: 'absolute',
  top: '30px',
  right: '40px',
  display: 'inline',
  float: 'right'
}

const options = [{ key: 'USD', text: 'USD', value: 'USD' },
{ key: 'MXN', text: 'MXN', value:'MXN' },
{ key: 'COP', text: 'COP', value: 'COP' },
{ key: 'ARS', text: 'ARS', value: 'ARS' },
{ key: 'ETH', text: 'ETH', value: 'ETH' },

]


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currency: 'USD',
      rate: 1
    }
  }

  componentWillMount() {
		const {currency} = this.state;
		axios.get('https://api.coinmarketcap.com/v2/ticker/2308/?convert=' + currency)
		.then(res => {
			this.setState({
				rate: res.data.data.quotes[currency].price
			})
		})
	}

  handleChange = (e, { value }) =>{
    this.setState({ currency: value })
    this.changePair(value)
  }

  changePair = (newPair) => {
    console.log(newPair)
		axios.get('https://api.coinmarketcap.com/v2/ticker/2308/?convert=' + newPair)
		.then(res => {
			this.setState({
				currency: newPair,
				rate: res.data.data.quotes[newPair].price
			})
		})
	}

  render() {
    const {currency, rate}  = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div style={styleTL}>
            <span><status-indicator active pulse></status-indicator>{'  Rinkeby Network'}</span>
          </div>
          <div style={styleTR}>
              <span>
              <p>1 DAI / {Math.round(rate *1000) /1000} 
              <Dropdown
                onChange={this.handleChange}
                options={options}
                placeholder=' USD'
                value={currency}
              />
              </p></span>
          </div>
          <MainCard />
        </header>
      </div>
    );
  }
}

export default App;
