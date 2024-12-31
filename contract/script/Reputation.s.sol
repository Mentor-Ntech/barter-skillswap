// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract ReputationSystem {
    struct Reputation {
        uint256 score;
        uint256 badges;
    }

    mapping(address => Reputation) public reputation;
    event ReputationUpdated(address indexed user, uint256 score);
    event BadgeMinted(address indexed user, uint256 badgeId);

    function updateReputation(address _user, uint256 _score) public {
        reputation[_user].score += _score;
        emit ReputationUpdated(_user, reputation[_user].score);
    }

    function mintBadge(address _user) public {
        reputation[_user].badges++;
        emit BadgeMinted(_user, reputation[_user].badges);
    }
}