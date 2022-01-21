import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Charity from '../abis/Charity.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Charity.networks[networkId]
    if(networkData) {
      const charity= web3.eth.Contract(Charity.abi, networkData.address)
      this.setState({ charity })
      const campaignCount = await charity.methods.campaignCount().call()
       this.setState({campaignCount})
      // Load Campaigns

      for (var i = 1; i <= campaignCount; i++) {
        const campaign = await charity.methods.Campaigns(i).call()
        this.setState({
          Campaigns: [...this.state.Campaigns, campaign]
        })
      }

      this.setState({ loading: false})
    } else {
      window.alert('Charity contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)    
    this.state = {
      account: '',
      campaignCount: 0,
      Campaigns: [],
      loading: true
    }
    //tbk
    this.AddCampaign = this.AddCampaign.bind(this)
    this.Donate = this.Donate.bind(this)

  }

  AddCampaign(name, description, goal, donUnit){
    this.setState({loading: true})
    this.state.charity.methods.AddCampaign(name,description,goal,donUnit).send({from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    }).catch(e=>{
      console.log(e)
    })
}


Donate(id, amount){
  this.setState({loading: true})
  this.state.charity.methods.Donate(id).send({from: this.state.account, value:amount})
  .once('receipt', (receipt) => {
    this.setState({ loading: false })
  })
}


  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main
                  Campaigns={this.state.Campaigns}
                  AddCampaign= {this.AddCampaign}
                  Donate={this.Donate} />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
