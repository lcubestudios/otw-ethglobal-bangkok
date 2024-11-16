// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract LocationLogger {
    struct Location {
        address user;
        int256 latitude;
        int256 longitude;
        uint256 timestamp;
    }

    Location[] public locations;

    event LocationRecorded(address indexed user, int256 latitude, int256 longitude, uint256 timestamp);

    function logLocation(int256 latitude, int256 longitude) public {
        Location memory newLocation = Location(msg.sender, latitude, longitude, block.timestamp);
        locations.push(newLocation);
        emit LocationRecorded(msg.sender, latitude, longitude, block.timestamp);
    }

    function getLocations() public view returns (Location[] memory) {
        return locations;
    }
}