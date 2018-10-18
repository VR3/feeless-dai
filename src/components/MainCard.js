import React, { Component } from 'react'
import { Card, Input, Button, Loader, Image } from 'semantic-ui-react'
import AccountBalance from './AccountBalance'
import HDWalletProvider from "truffle-hdwallet-provider";
import config from '../config';
import Web3 from 'web3';
import QRCode from 'qrcode.react'

const provider = new HDWalletProvider(config.mnemonic, "https://rinkeby.infura.io/v3/" + config.apiKey);
const DaiAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name_","type":"bytes32"}],"name":"setName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"push","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"},{"name":"guy","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"wad","type":"uint256"}],"name":"pull","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"}];

export default class MainCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            step: 0,
            gasPrice: null,
            toAddress: null,
            daiBalance:0,
            amount: null,
            txHash: null,
            myAccount: '',
            counter: 20,
        }
    }

    triggerCounter = () => {
        setInterval(() => {
            const {counter} = this.state
            let intervalCounter =  counter;
            if (counter <= 0) {
                return 
            }
            this.setState({
                counter: intervalCounter--
            })
            console.log(intervalCounter)
        }, 1000)
    }

    componentDidMount() {
        fetch('https://api.etherscan.io/api?module=proxy&action=eth_gasPrice&apikey=YourApiKeyToken')
        .then(response => response.json())
        .then(data => {
            this.setState({
                gasPrice: data.result
            })
        });
        const web3 = new Web3(window.web3.currentProvider)
        web3.eth.getAccounts((error, accounts) => {
            const DaiToken = new web3.eth.Contract(DaiAbi,'0x7c2ae5e4d2756cb5beff22b33491c2696932b777');
            DaiToken.methods.balanceOf(accounts[0]).call( (err, res) => {
                const daiBalance = web3.utils.fromWei(res.toString(), 'ether') / 10;
                this.setState({daiBalance, myAccount: accounts[0]});
            })
        });
    }

    sendTx = () => {
        this.setState({
            step: 1
        })
       this.daiProtocol();
    }

    daiProtocol = () => {
        const {toAddress, myAccount} = this.state;
        const daiWeb3 = new Web3(provider.engine);


        daiWeb3.eth.getAccounts((error, accounts) => {
            console.log(accounts);
            if (error) {return};
            daiWeb3.eth.sendTransaction({
                from:accounts[0],
                to:myAccount,
                value: daiWeb3.utils.toWei('0.0005', 'ether')},  // daiWeb3.utils.hexToNumber(this.state.gasPrice * 1000000)}
            ).on('transactionHash', (hash) => {
                console.log('hash: ' + hash)
                this.triggerCounter();
                this.setState({
                    txHash: hash,
                    step: 2,
                })
            }).on('receipt', function(receipt){
                console.log('receipt: ' + receipt)
            })
        }); 

    }

    confirmTx = () => {
        const {amount, toAddress} = this.state;
        const web3 = new Web3(window.web3.currentProvider)
        web3.eth.getAccounts((error, accounts) => {
            const DaiToken = new web3.eth.Contract(DaiAbi,'0x7c2ae5e4d2756cb5beff22b33491c2696932b777');
            console.log(DaiToken)
            DaiToken.methods.transfer(toAddress, (amount * 1e18).toString())
            .send({from: accounts[0]})
            .on('transactionHash', (hash) => {
                console.log('hash: ' + hash)
                this.setState({
                    txHash: hash,
                    step: 3,
                })
            }).on('receipt', (receipt) => {
                console.log(receipt)
                this.setState({
                    txHash: receipt,
                    daiBalance: Math.round((this.state.daiBalance - this.state.amount / 10 ) * 100)/ 100,
                    step: 4,
                })
            }).catch(console.error);
        });
    }


    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render() {
        const {step, toAddress, amount, gasPrice, txHash, daiBalance} = this.state;
        return (
            <Card raised style={{height: '80vh', width:'80vh'}}>
                <Card.Content>
                <Image src='https://cdn-images-1.medium.com/max/1600/1*R2wtB9MD9TrX8Vv2NJBxLQ.png' size='small' />
                <Card.Header>Feeless Dai</Card.Header>
                <Card.Meta>
                    <span className='date'>No Gas Required</span>
                </Card.Meta>
                <Card.Description style={{marginTop: '5%'}}>
                    {step === 0 &&
                        <div>
                            <p>Send to:</p>
                            <Input
                                icon='user'
                                iconPosition='left' 
                                size='mini' 
                                fluid
                                name='toAddress'
                                value={toAddress}
                                onChange={this.handleChange}
                            />
                            <p>Amount</p>
                            <Input
                                size='mini'
                                icon='exchange'
                                iconPosition='left'  
                                style={{width: '30vh'}}
                                name='amount'
                                value={amount}
                                onChange={this.handleChange}
                            />
                            <br/>
                            {gasPrice ? 
                            (<Button size="big" style={{marginTop: '2%'}} onClick={() => this.sendTx()}>Send</Button>)
                            :(
                                <Button size="big" disabled style={{marginTop: '2%'}}>Loading...</Button>
                            )}
                             </div>
                    }
                    {step === 1 &&
                        <div>
                            <Loader active>
                                Loading your transaction...
                            </Loader>
                        </div>
                    }
                    {step === 2 &&
                        <div>
                            {txHash && <p>Transaction funded: <a href={"https://rinkeby.etherscan.io/tx/" + txHash}>{txHash.substring(0,14)}...</a></p>}
                            <QRCode size="160" value="http://facebook.github.io/react/" /><br/>
                            <Button style={{marginTop: '2%'}} onClick={() => this.confirmTx()}>Free Transaction</Button>
                        </div>
                    }
                    {step === 3 &&
                        <div>
                            <Loader active>
                                Please wait until your DAI is processed
                            </Loader>
                            <a href={"https://rinkeby.etherscan.io/tx/" + txHash}>{txHash.substring(0,14)}...</a>
                        </div>
                    }
                    {step === 4 &&
                        <div>
                            <p>Thanks for using DAI</p>
                            <a href={"https://rinkeby.etherscan.io/tx/" + txHash.transactionHash}>Confirmation Screen</a>
                            <p>Balance: {daiBalance * 10}</p>
                        </div>
                    }
                    
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <AccountBalance />
                    <a>
                        <b>{ Math.round(daiBalance * 1000) / 100 } </b>Dai
                    </a>
                </Card.Content>
            </Card>
        )
    }
}
