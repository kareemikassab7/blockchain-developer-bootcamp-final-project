Charity and Crowdfunding collection Platform
----
<br>

## Author & Etheruem public Acc to get NFT Cert.

<br>
Kareem Kassab
I am a Computer Engineering Student studying at the American University in Cairo.
<br>
<b>public address to receive NFT:</b> 
0x250d3eF805d611B04eB51F4011c32D0453D3479A

## Delpoyed URL

https://blockchain-developer-bootcamp-final-project-steel.vercel.app/

## Project Description
<br>
This is my project for the Consensys 2021 bootcamp. It is a charity and crowdfunding collection platform. The implemented part is used to add charity campagigns and collect donations for them in pre-defined donation units. the charity part can still be extended by giving the ability to withdraw collected funds by the front end (transfer them to the raiser address) but I didn't have time so I satisfied the requirement and am going to extend on it later. 
<br>
It can still be extended to collect crowdfunding funds for startups in campaigns with deadlines and times (began implementation but not complete and its commented). I am intedning to use gelato to schedule a function to check deadlines later.
<br>
The front end is very simple: entry slots for the basic campaign data, a button to submit info and add the campaign to the table below. you can then press the "donate" button to send a donation unit through your metamask wallet. all data from contract is shown in the front end.

## video walkthrough
ganache deployed + testing explanation: https://youtu.be/AzZapCeMz3E
<br>
ropsten deployed: https://youtu.be/zm-vKUzcSb8

## Directory Structure

inside, there is the main directory, and a few other directories explained below:
##### 1.Charity_CrowdFunding_Collection
<br>
contains everything else in one package
##### 2.migrations
<br>
has 2 migration files that are used by truffle to migrate the contracts in the src directory
##### 3.node_modules
<br>
has node modules installed by npm. make sure to run "npm install" to get whats missing
##### 4.src
<br>
has all the source code for the backend and front end and is divided as follows
###### 4.1 abis
<br>
has the json files that are used by the front end
###### 4.2 components
<br>
has all the main components for the front end which are the 
- App: contain the main functionality and function declarations
- main: contain the displayed components such as the table and button
- navbar: contains the navbar :D
###### 4.3 contracts
<br>
have the main contract for thre backend written in solidity named Chairty.sol

##### 5.test
<br>
has one test file to be ran by "truffle test". Please note that there are 3 tests that are failing for some reason I couldnt solve but they behave exactly as intended.

## Versions Used
<br>
Below are the versions used in my development so that you can setup your environment accordingly: 
Truffle v5.4.12 (core: 5.4.12)
Ganache v2.5.4
Solidity v0.8.0 (solc-js)
Node v10.19.0
Web3.js v1.5.3
React 17.0.2

## Testing
<br>
All the testing is done on ganache port 7545
<br>
Note: During the testing there are 3 tests that pass and 3 tests that fail. the tests that fail behave correctly as they add a campaign and is shown to be right by the event. the last test in the file is supposed to fail as the campaign gets closed when the raised amount is satisfied and it then tries to send again.

## Get ready to deploy

after installations u need
- create a .env file (show hidden files to see it)
add the following 2 lines after putting ur data instead of the 2 curly braces
----
INFURAID= {your endpoint ID without quotes or any braces}
MNEMONIC= {your wallet mnemonic in quotes}
----

## How to Run
1- install all the programs above with the specified versions
2- in the Charity_CrowdFunding_Collection directory open a terminal and run the following commands:
$ truffle compile
$ truffle migrate                 you can change this one if ur migrating to another network
$ truffle test

3- <b>IMPORTANT</b>: if the truffle config didnt work while u deploy to a public network, just comment line 15, and uncomment lines 5 and 16. then, put your mnemonic phrase in the placeholder of line 5 "word1 word2 word3.... word12". then, put your infura endpoint ID instead of the placeholder PUT_YOUR_ID_HERE in line 16 (just find and replace). after this it should work.

<b>CAUTION</b> this is not safe as it can let ur wallet be stolen. I did this because I'm short on time and wanted to solve the error quickly as the .env is not working for some reason. after you deploy and if you want to share make sure to remove your confidential info.

4- for front end type:
$ npm install
$ npm run start

then connect your metamask wallet and connect it to the ropsten network.
