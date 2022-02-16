pragma solidity ^0.4.24;

import "./ERC721Full.sol";

contract BBRZ is ERC721Full {
  string[] public tokens;
  mapping(string => bool) _tokenExists;

  constructor() ERC721Full("BBRZ", "BBRZ") public {
  }

  function mint(string memory _token, string memory tokenURI) public {
    require(!_tokenExists[_token]);
    uint _id = tokens.push(_token);
    _mint(msg.sender, _id);
    _setTokenURI(_id, tokenURI);
    _tokenExists[_token] = true;
  }

  function burn(uint256 tokenId) public {
    _burn(msg.sender, tokenId);
  }

}
