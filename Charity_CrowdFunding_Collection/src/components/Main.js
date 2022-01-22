import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Add Campaign</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.campaignName.value
          const description = this.campaignDesc.value
          const donUnit = window.web3.utils.toWei(this.donUnit.value.toString(), 'Ether')
          console.log("amount is: "+donUnit)
          const goal = window.web3.utils.toWei(this.campaignGoal.value.toString(), 'Ether')
          this.props.AddCampaign(name, description, goal, donUnit)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="campaignName"
              type="text"
              ref={(input) => { this.campaignName = input }}
              className="form-control"
              placeholder="Campaign Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="campaignDesc"
              type="text"
              ref={(input) => { this.campaignDesc = input }}
              className="form-control"
              placeholder="Campaign Description"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="campaignGoal"
              type="text"donUnit
              ref={(input) => { this.campaignGoal = input }}
              className="form-control"
              placeholder="Goal"
              required />
          </div> 
          <div className="form-group mr-sm-2">
            <input
              id="donUnit"
              type="text"id
              ref={(input) => { this.donUnit = input }}
              className="form-control"
              placeholder="Donation Unit"
              required />
          </div>          
          <button type="submit" className="btn btn-primary">Add Campaign</button>
        </form>
        <p>&nbsp;</p>
        <h2>Donate Now ^.^</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>{(input) => { this.campaignName = input }}
              <th scope="col">Raised Amount</th>
              <th scope="col">Goal</th>
              <th scope="col">Donation Unit</th>
              <th scope="col">State</th>
              <th scope="col">Raiser</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="campaignList">
            { this.props.Campaigns.map((campaign, key) => {
              console.log(campaign)
              console.log("DA ELLY GWA EL STATEE: ",campaign.state)
              return(
                <tr key={key}>
                  <th scope="row">{campaign.id.toString()}</th>
                  <td>{campaign.name}</td>
                  <td>{campaign.description}</td>
                  <td>{window.web3.utils.fromWei(campaign.RaisedAmt.toString(), 'Ether')} Eth</td>
                  <td>{window.web3.utils.fromWei(campaign.goal.toString(), 'Ether')} Eth</td>
                  <td>{window.web3.utils.fromWei(campaign.donUnit.toString(), 'Ether')} Eth</td>
                  <td>{campaign.state ==0?"closed": "open"}</td>
                  <td>{campaign.owner}</td>
                  <td>
                  { !campaign.state==0
                    ?<button
                          name={campaign.id}
                          value={campaign.donUnit} //={(input) => { this.donUnit = input }}
                          onClick={(event) => {
                            //this.props.purchaseProduct(event.target.name, event.target.value)
                            this.props.Donate(event.target.name, event.target.value)

                          }}
                        >
                          Donate
                        </button>                    
                    : null}
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
