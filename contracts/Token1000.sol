// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract VeelGeekERC20 is ERC20, Ownable {
    uint supply = 100000;
    uint minted = 0;
    constructor() ERC20("VelGeek", "VGK") {
        _mint(msg.sender, supply * 10 ** decimals());
    }
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual override
        {
            super._beforeTokenTransfer(from, to, amount);
            if(minted == 0){
                minted = supply;
            }else{
                require(balanceOf(to) <= 1000 * 10 ** decimals(),"More 1000 tokens on address");
                require(balanceOf(to) + amount <= 1000 * 10 ** decimals(),"More 1000 tokens on address after transaction");
            }
        }
}