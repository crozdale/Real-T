pragma solidity >=0.4.21 <0.7.0;

import "./Ownable.sol";
import "./ERC20.sol";

contract realToken is ERC20, Ownable {

    string public name;
    string public symbol;
    uint8 public decimals; // 18 decimals is the strongly suggested default, avoid changing it
    
    //uint256 public _totalSupply;
    
    //mapping(address => uint) balances;
    //mapping(address => mapping(address => uint)) allowed;
    
    /**
     * Constrctor function
     *
     * Initializes contract with initial supply tokens to the creator of the contract
     */
    constructor() public {
        name = "realT";
        symbol = "realT";
        decimals = 8;
        _totalSupply = 10 * (10**6) * (10 ** uint256(decimals)) ; // 10 illion
        
        _balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    //////////////// owner only functions below

    /// @notice To transfer token contract ownership
    /// @param _newOwner The address of the new owner of this contract
    function transferOwnership(address _newOwner) public onlyOwner {
        _balances[_newOwner] = _balances[msg.sender];
        _balances[msg.sender] = 0;
        Ownable.transferOwnership(_newOwner);
    }
    
}