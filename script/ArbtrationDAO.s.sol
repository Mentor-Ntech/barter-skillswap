// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract ArbitrationDAO {
    struct Dispute {
        uint256 id;
        uint256 listingId;
        address raisedBy;
        bool resolved;
        address resolution;
    }

    uint256 public disputeCounter;
    mapping(uint256 => Dispute) public disputes;
    mapping(uint256 => mapping(address => bool)) public votes;
    mapping(uint256 => uint256) public voteCounts;

    event DisputeCreated(uint256 id, uint256 listingId, address raisedBy);
    event DisputeResolved(uint256 id, address resolution);

    function createDispute(uint256 _listingId) external {
        disputeCounter++;
        disputes[disputeCounter] = Dispute(disputeCounter, _listingId, msg.sender, false, address(0));
        emit DisputeCreated(disputeCounter, _listingId, msg.sender);
    }

    function voteOnDispute(uint256 _disputeId, address resolution) external {
        require(!disputes[_disputeId].resolved, "Dispute already resolved");
        require(!votes[_disputeId][msg.sender], "Already voted");

        votes[_disputeId][msg.sender] = true;
        voteCounts[_disputeId]++;

        if (voteCounts[_disputeId] > 1) { // Replace with suitable threshold
            disputes[_disputeId].resolved = true;
            disputes[_disputeId].resolution = resolution;
            emit DisputeResolved(_disputeId, resolution);
        }
    }
}
