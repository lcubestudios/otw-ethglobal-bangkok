// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract LocationLogger {
    struct Location {
        address user;
        int256 latitude;
        int256 longitude;
        uint256 timestamp;
        string placeName;
        string country;
        string city;
        string zipCode;
    }

    Location[] public locations;

    event LocationRecorded(
        address indexed user,
        int256 latitude,
        int256 longitude,
        uint256 timestamp,
        string placeName,
        string country,
        string city,
        string zipCode
    );

    function logLocation(
        int256 latitude,
        int256 longitude,
        string memory placeName,
        string memory country,
        string memory city,
        string memory zipCode
    ) public {
        Location memory newLocation = Location(
            msg.sender,
            latitude,
            longitude,
            block.timestamp,
            placeName,
            country,
            city,
            zipCode
        );
        locations.push(newLocation);
        emit LocationRecorded(
            msg.sender,
            latitude,
            longitude,
            block.timestamp,
            placeName,
            country,
            city,
            zipCode
        );
    }

    function getLocations() public view returns (Location[] memory) {
        return locations;
    }
}