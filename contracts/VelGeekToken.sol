// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract VelGeekToken is ERC20, Ownable {
    uint supply = 100000;

    constructor() ERC20("VelGeek", "VELGEEK") {
        _mint(msg.sender, supply * 10 ** decimals());
    }

    function _transfer(address from, address to, uint256 amount)
    internal virtual override
    {
        require(from == owner() || balanceOf(to) + amount <= 1000 * 10 ** decimals(),
            "Balance will reach its limit of 1000 tokens when it comes to the address");

        super._transfer(from, to, amount);
    }
}