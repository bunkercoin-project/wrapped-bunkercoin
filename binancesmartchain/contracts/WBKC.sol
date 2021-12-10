// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WBKC is Ownable, ERC20("Wrapped BKC", "wBKC"){

    /**
     * @dev The owner of the contract minting coins to buyers.
     * @param account The beneficiary address
     * @param amount Number of tokens to be sent
     */
    function mint(address account, uint256 amount) public onlyOwner{
        _mint(account, amount);
    }

    /**
     * @dev The owner of the contract burns coins in it's possesion to represent a realease of BKC on chain.
     * @param value The amount of coins to be burned. This should represent the amount of coins released from the BKC vault.
     */
    function burn(uint value) public onlyOwner {
        _burn(_msgSender(),value);
    }


    // Blocking of renouncing.
    function renounceOwnership() public view override onlyOwner {
        revert("renouncing is blocked");
    }

    /**
     * @dev Remember that only owner can call so be careful when use on contracts generated from other contracts.
     * @param tokenAddress The token contract address
     * @param tokenAmount Number of tokens to be sent
     */
    //ability to recover ERC20 tokens sent to this contract
    function recoverERC20(address tokenAddress, uint256 tokenAmount) public virtual onlyOwner {
        IERC20(tokenAddress).transfer(owner(), tokenAmount);
    }

}