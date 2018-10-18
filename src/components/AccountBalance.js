import React, { Component } from 'react'
import Web3 from 'web3'


export default class AccountBalance extends Component {

    state = {
        web3: null,
    }

    componentWillMount() {
        const web3 = new Web3(window.web3.currentProvider)
        web3.eth.getAccounts((error, accounts) => {
            this.setState({
                currentAccount: accounts[0]
            })
        });
        
    }

    render() {
        const {currentAccount} = this.state;
        return (
        <div>
            { currentAccount ?
                (<p>{currentAccount.substring(0,20) + '...'}</p>) : (<p>No Wallet</p>)
            }
            
        </div>
        )
    }
}
