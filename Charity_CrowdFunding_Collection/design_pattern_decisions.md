# Design patterns 


### Inheritance and Interfaces

- `Charity` contract inherits the OpenZeppelin `Ownable` contract to be able to implement the access control design pattern for the owner of the contract only. Charity Also Inherits from the `Organization` interface its basic `Donation` function, and enum for the state.

- `Crowdfunding` contract inherits the OpenZeppelin `Ownable` contract to be able to implement the access control design pattern for the owner of the contract only. CrowdFunding Also Inherits from the `Organization` interface its basic `Donation` function, and enu for the state.


### Access Control Design Patterns

- `Ownable` design pattern used in the Charity contract as I inherrited it and used the owner() to assign a value to the raiser of the campaign.

