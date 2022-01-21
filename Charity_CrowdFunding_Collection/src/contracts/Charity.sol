pragma solidity 0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title  Crowdfunding  & Charity collection Platform
/// @author Kareem Kassab
/// @notice this is a project to allow for launching crowdfunding campaigns for projects, and can be extended to collect charity donations
/// @dev All function calls are currently implemented without side effects



/// @dev abstract class for charity and crowdfunding contracts to inherit from
interface Project{
    enum State {Closed, Ongoing}
    function Donate(uint _id) external payable;
}


/// @title The charity contract
/// @notice Allows us to add campaigns, donate, and collect the raised funds
/// @dev has 3 main functions named AddCampaign, Donate, and claimFunds
contract Charity is Project, Ownable{
    
    /// @dev stores all campaign parameters that will be filled using AddCampagin and be accessed later
    struct Campaign {
        string name;
        uint donUnit;
        uint id;
        address Raiser;
        uint RaisedAmt;
        uint256 goal;
        State state;
        uint timestamp;
        uint256 deadline;
        string description;
        /*uint duration; 
        string InfoUrl;
        string ImgUrl;*/
    }
    
    /// @dev array of IDs of campaings that correspond to their campaign IDs as well
    uint[] public IDList;

    /// @dev mapping of campaign structs to their Ids
    mapping (uint => Campaign) public Campaigns;

    /// @dev integer counter that will be incremented once we add new campaings and used to assign them IDs
    uint public campaignCount= 0;


/// @notice Displays some campaign data after it is being added to make sure it was stored correctly
/// @dev emitted when we call AddCampaign to emit the id, name, and the address of the one who added the campaign
event logAddedCampaign(uint  id, string  CampaignName, address  Raiser);


/// @notice Displays some info about a donation once it happended
/// @dev emitted when we call Donate() to emit the address of donater, amount donated, and the Raised amount until now
event logDonated(address donater, uint amt, uint Raised);


/*
modifiers
*/    

/// @dev vlidate that the campaign is in an Ongoing state to accept donations
modifier isOngoing (uint id){
require (Campaigns[id].state== State.Ongoing , "This Campaign has been closed");
    _;
}

/*
functions
*/

/// @dev function that adds a new campaign to the mapping after taking the required parameters from the Raiser, uses owner() to eb the Raiser
/// Note The commented lines can be used to extend code functionality

function AddCampaign(string memory _name, string memory _description, uint _goal, uint _donUnit) public onlyOwner{
    //, uint _duration, string memory _InfoUrl, string memory _ImgUrl
    require(bytes(_name).length>0, "name cannot be empty");
    require(_goal>0, " goal cannot be 0 eth");
//require(_duration>0, " duration cannot be 0 days");

    uint newID= campaignCount + 1;
    
    //newCampaign.deadline= block.timestamp + (_duration * 1 days);
    IDList.push(newID);
    Campaigns[newID] = Campaign(_name, _donUnit, newID, owner(), 0, _goal, State.Ongoing, block.timestamp, 0, _description);

    emit logAddedCampaign(Campaigns[newID].id, Campaigns[newID].name, Campaigns[newID].Raiser);
    campaignCount+= 1;
}

/// @dev checks that the raised amount isnt equal to the goal (closes campaign if it is), checks that the sent amount is equal to the donated amount, increases the raised amount for the campaign.
    
    function  Donate (uint _id) external  payable override isOngoing(_id){
        require(msg.value== Campaigns[_id].donUnit);
        Campaigns[_id].RaisedAmt += msg.value;

        if(Campaigns[_id].RaisedAmt>=Campaigns[_id].goal){
            Campaigns[_id].state= State.Closed;
        }

        emit logDonated(msg.sender, msg.value, Campaigns[_id].RaisedAmt);
    }

/// @notice allows us to get the raised funds to our account
/// @dev checks that the claimer is the raiser, checks that the campaign is closed, then sends the raised funds.

    function  claimFunds (uint _id) external {
        require(msg.sender== Campaigns[_id].Raiser, "You don't have the right to claim the funds");
        require (Campaigns[_id].RaisedAmt == Campaigns[_id].goal, "sorry campaign isnt over yet" );
        Campaigns[_id].state= State.Closed;
        payable(msg.sender).transfer(Campaigns[_id].RaisedAmt); ///transfer raised amt only
    }

    /// @dev getter function for raised amount variable
    function getRaisedAmt(uint _id)  public view returns (uint) {
        return Campaigns[_id].RaisedAmt;
    }

     /// @notice Explain to an end user what this does
     /// @dev some getter functions i used in some testing
     /*function returnTest(uint num) view public returns (uint) {
        return Test[num];
    }*/
      
    function retcount() public view returns (uint){
        return campaignCount;
    }
    ///function getCampaign(uint id) public
  
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/// @notice adds new campaigns, allows users to send donations, allows fund raisers to claim their funds when the campaign is over
/// @dev Explain to a developer any extra detail549+-





/**contract CrowdFunding is Project, Ownable {


    struct Campaign {
        string name;
        uint id;
        address Raiser;
        uint RaisedAmt;
        uint256 goal;
        State state;This Ca
        uint timestamp;
        uint duration; 
        uint256 deadline;
        string description;
        string InfoUrl;
        string ImgUrl;This Ca
    mapping (uint => Campaign) public CF_Campaigns;
    uint campaignCount= 0;
// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details

event logAddedCampaign(uint indexed id, string indexed CampaignName, address indexed Raiser);

This Ca
/*
modifiers


///@notice checks if the campaign is still running 
///@dev used to validate that the campaign is in an Ongoing state to accept donations
modifier isOngoing (uint id){
require (CF_Campaigns[id].state== State.Ongoing , "This Campaign has been closed");
    _;
}

/*
functions



function AddCampaign(string memory _name, string memory _description, uint _goal, uint _duration, string memory _InfoUrl, string memory _ImgUrl) public{
    uint newID= campaignCount + 1;
    Campaign memory newCampaign = Campaign({
            name: _name,
            id: newID,
            Raiser: msg.sender,
            RaisedAmt: 0, 
            goal: _goal,
            state: State.Ongoing,
            timestamp: block.timestamp,
            duration: _duration,
            deadline: 0 ,
            description: _description,
            InfoUrl: _InfoUrl,
            ImgUrl: _ImgUrl });
    
    newCampaign.deadline= block.timestamp + (_duration * 1 days);
    IDList.push(newID);
    CF_Campaigns[newCampaign.id] = newCampaign;
    emit logAddedCampaign(newCampaign.id, newCampaign.name, msg.sender);
    campaignCount+= 1;
}

/// @dev checks if the campaign's deadline hastn passed, checks that the sent amount is equal to the donated amount, increases the raised amount for the campaign.

function  Donate (uint _id, uint amount) external  payable isOngoing(_id){
    require(msg.value == amount);
    require(CF_Campaigns[_id].timestamp + block.timestamp < CF_Campaigns[_id].deadline);
    CF_Campaigns[_id].RaisedAmt+= amount;
}


/// end of contract
}

/*



function CheckDeadlines
function TerminateCampaign + refund
function collectFunds


 */
