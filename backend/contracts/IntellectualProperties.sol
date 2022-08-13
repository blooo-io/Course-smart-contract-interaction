//SPDX-License-Identifier: Unlicense
//specific solidity cersion
pragma solidity ^0.8.7;
// we can use the console.log func from hardhat for debugging (like in javascript)
import "hardhat/console.sol";

// openzeppelin provides libaries of different use cases, this one provides a counter with best practices 
// a simple way to get a counter that can only be incremented or decremented. Very useful for ID generation, counting contract activity, among others.
import "@openzeppelin/contracts/utils/Counters.sol";

contract IntellectualProperties {

  struct IntellectualProperty {
    uint id;
    string firstName;
    string lastName;
    string description;
    string fileHash;
    string fileName;
    address ownerAddress;
  }

  using Counters for Counters.Counter;
  Counters.Counter private intellectualPropertiesIds;

  mapping(address => IntellectualProperty[]) private intellectualProperties;
  mapping(uint=> address ) private accounts;
  IntellectualProperty[] private allIntellectualProperties;

  event ipCreated(address indexed intellectualPropertyAddress, string name, string lastName);


  function createIntellectualProperty( string calldata _firstname, string calldata _lastname, string calldata _desc, string calldata _fileHash, string calldata _fileName ) external {
      intellectualPropertiesIds.increment();
      uint intellectualPropertyId = intellectualPropertiesIds.current();
      address _address = address(msg.sender);
      IntellectualProperty memory newIntellectualProperty = IntellectualProperty(intellectualPropertyId, _firstname, _lastname, _desc, _fileHash, _fileName, _address);

      intellectualProperties[_address].push(newIntellectualProperty);
      allIntellectualProperties.push(newIntellectualProperty);
      accounts[intellectualPropertyId] = msg.sender;

      emit ipCreated(_address, _firstname, _lastname);
  }

  function getAllDeployedIntellectualProperties() external view returns (IntellectualProperty[] memory) {
    return allIntellectualProperties;
  }

  function getMyIntellectualProperties() external view returns (IntellectualProperty[] memory) {
      return intellectualProperties[msg.sender];
  }
}
