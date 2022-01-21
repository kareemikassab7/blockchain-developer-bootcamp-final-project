# Contract Pitfall Protection Measures

## SWC-107 (Reentrancy)

Implemented the Check-Effect-Interaction design pattern before I returned funds, donations, or profits (commented part). modified the state before sending funds in ClaimFunds function (not in front end)

## SWC-103 (Floating pragma)

Used a specific compiler pragma `0.8.0` used in contracts and truffle configuration to avoid issues with resource control accounted to outdated compiler versions.

## SWC-105 (Unprotected Ether Withdrawal)

`withdraw` is protected with OpenZeppelin `Ownable`'s `onlyOwner` modifier.

## SWC-104 (Unchecked Call Return Value)

The return value from a call to the owner's address in `addAsTenant` is checked with `require` to ensure transaction rollback if call fails.

## Modifiers used only for validation

All the modifiers in my contract are only to validate data with `require` statements.

## Pull over push

All functions that modify state are based on receiving calls rather than making contract calls.

