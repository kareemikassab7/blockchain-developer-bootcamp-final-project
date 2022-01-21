const { assert } = require("chai");

const Charity = artifacts.require('Charity.sol')



contract("Charity", function (accounts) {
    const [owner, secondAccount] = accounts;
    /** create an instance of the contract to use its functions before each test */
    before(async () => {
      charity = await Charity.new();
    });

    /*checks if the contract is deployed correctly 
    */
    it('should deploy correctly', async () => {
        const charity = await Charity.deployed();
        console.log(charity.address);
        assert(charity.address != '');
    });

    /** checks the ownable contract is inherited correctly */
    it("should add first account as owner using OpenZeppelin Ownable", async () => {
    assert.strictEqual(await charity.owner(), owner);
    });
//function AddCampaign(string memory _name, string memory _description, uint _goal, uint _duration, string memory _InfoUrl, string memory _ImgUrl) public onlyOwner{

        /** add simple campaign */
    it ('should add a campaign', async ()=> {
      result = await charity.AddCampaign("Salah", "Salah", web3.utils.toWei('0.000005', 'Ether'));
      result2 = await charity.AddCampaign("Kareem", "Kareem", web3.utils.toWei('1', 'Ether'));
      charity.events.logAddedCampaign();
      /*count= await charity.retcount()
      assert.equal(count.toNumber(), 0)
      /*const event = result.logs[0].args
      assert.equal(event.id.toNumber()+1, count.toNumber, 'id correct' )
      /*charity.events.logAddedCampaign();
     const result = charity.returnID(0);
      assert.equal(result, 1);*/
    });

    /*check the campaings*/
    it ('should list a campaign', async ()=> {
      const campaign = await charity.Campaigns(1);
      //console.log(campaign);
      assert.equal(campaign.name, 'Salah', 'name is not correct');
      assert.equal(campaign.goal.toNumber(), web3.utils.toWei('0.000005', 'Ether'), 'goal isnt correct');
    });

    it ('should Donate and track raised amt', async ()=> {
      const campaign = await charity.Campaigns(1);
      result = await charity.Donate(1, {value:web3.utils.toWei('0.000001', 'Ether')});
      result2 = await charity.Donate(1, {value:web3.utils.toWei('0.000003', 'Ether')});
      //console.log(campaign); 
      const amt= await charity.getRaisedAmt(1);
      //console.log(amt);
      charity.events.logDonated();
      assert.equal(amt.toNumber(),web3.utils.toWei('0.000004', 'Ether'), 'sent amount wasnt correct');
    });

    it ('should fail and say the campaign is closed', async ()=> {
      result3 = await charity.AddCampaign("Seba", "Seba", web3.utils.toWei('0.000001', 'Ether'));
      const campaign = await charity.Campaigns(3);
      pay = await charity.Donate(3, {value:web3.utils.toWei('0.000001', 'Ether')}); 
      payAgain= await charity.Donate(3, {value:web3.utils.toWei('0.000001', 'Ether')}); 
      const amt= await charity.getRaisedAmt(3);
      //console.log(amt);
      charity.events.logDonated();
      assert.equal(amt.toNumber(),web3.utils.toWei('0.000001', 'Ether'), 'sent amount wasnt correct');
    });

});