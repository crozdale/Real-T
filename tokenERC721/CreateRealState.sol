pragma solidity >=0.4.21 <0.7.0;

import "./Ownable.sol";
import "./SafeMath.sol";

contract CreateRealState is Ownable {

  using SafeMath for uint256;

  event Newproperty(uint propertyId, string propertyDescription, uint256 hashproperty, uint timeCreated);

  uint Digits = 18;
  uint Modulus = 10 ** Digits;

  struct Property {
    uint propertyId;
    uint256 hashproperty;
    uint timeCreated;
  }

  Property[] public propertys;

  mapping (uint => address)  propertyToOwner;
  mapping (address => uint) ownerpropertyCount;
  mapping (uint => address) tokenToOwner;

  function _createproperty(uint _propertyId, uint _hashproperty) internal {
    uint id = propertys.push(property(_propertyId, _hashproperty, now)) - 1;
    propertyToOwner[id] = msg.sender;
    tokenToOwner[_propertyId] = msg.sender;
    ownerpropertyCount[msg.sender] = ownerpropertyCount[msg.sender].add(1);
    emit Newproperty(id, _propertyId, _hashproperty, now);
  }

  function _generateRandomhashproperty(uint _name) private view returns (uint) {
    uint rand = uint(keccak256(abi.encodePacked(_name.add(now))));
    return rand % Modulus;
  }

  function createRandompropertyId(uint _name) public returns (uint){
    require(tokenToOwner[_name] == 0x0000000000000000000000000000000000000000);
    uint randhash = _generateRandomhashproperty(_name);
    randhash = randhash - randhash % 100;
    _createproperty(_name, randhash);
    return randhash;
  }
}                   

