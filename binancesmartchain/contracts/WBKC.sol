// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../utils/Ownable.sol";
import "../utils/CanRecoverTokens.sol";
import "../utils/ERC20.sol";

contract WBKC is ERC20("Wrapped BKC", "wBKC"),
    CanRecoverTokens {

    function mint(address account, uint256 amount) public onlyOwner{
        _mint(account, amount);
    }
    function burn(uint value) public onlyOwner {
        _burn(_msgSender(),value);
    }


    function renounceOwnership() public view override onlyOwner {
        revert("renouncing ownership is blocked");
    }
}