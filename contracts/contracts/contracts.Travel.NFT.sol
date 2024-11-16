// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TravelNFT is ERC721 {
    uint256 public tokenCounter;

    constructor() ERC721("TravelNFT", "TNFT") {
        tokenCounter = 0;
    }

    function mintNFT(address to) public returns (uint256) {
        uint256 tokenId = tokenCounter;
        _safeMint(to, tokenId);
        tokenCounter++;
        return tokenId;
    }
}