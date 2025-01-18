// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.27;


// contract ArbitrationDAO {
//     struct Dispute {
//         uint256 id;
//         uint256 listingId;
//         address raisedBy;
//         bool resolved;
//         address resolution;
//     }

//     uint256 public disputeCounter;
//     mapping(uint256 => Dispute) public disputes;
//     mapping(uint256 => mapping(address => bool)) public votes;
//     mapping(uint256 => uint256) public voteCounts;

//     event DisputeCreated(uint256 id, uint256 listingId, address raisedBy);
//     event DisputeResolved(uint256 id, address resolution);

//     function createDispute(uint256 _listingId) external {
//         disputeCounter++;
//         disputes[disputeCounter] = Dispute(disputeCounter, _listingId, msg.sender, false, address(0));
//         emit DisputeCreated(disputeCounter, _listingId, msg.sender);
//     }

//     function voteOnDispute(uint256 _disputeId, address resolution) external {
//         require(!disputes[_disputeId].resolved, "Dispute already resolved");
//         require(!votes[_disputeId][msg.sender], "Already voted");

//         votes[_disputeId][msg.sender] = true;
//         voteCounts[_disputeId]++;

//         if (voteCounts[_disputeId] > 1) { 
//             disputes[_disputeId].resolved = true;
//             disputes[_disputeId].resolution = resolution;
//             emit DisputeResolved(_disputeId, resolution);
//         }
//     }
// }


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
    
    // New variables for trusted signers and quorum
    mapping(address => bool) public trustedSigners;
    uint256 public numTrustedSigners;
    uint256 public quorumPercentage; // Percentage of trusted signers needed for quorum (1-10)
    address public admin;

    event DisputeCreated(uint256 id, uint256 listingId, address raisedBy);
    event DisputeResolved(uint256 id, address resolution);
    event TrustedSignerAdded(address signer);
    event TrustedSignerRemoved(address signer);
    event QuorumPercentageUpdated(uint256 newPercentage);

    constructor(uint256 _quorumPercentage) {
        require(_quorumPercentage > 0 && _quorumPercentage <= 10, "Invalid quorum percentage");
        quorumPercentage = _quorumPercentage;
        admin = msg.sender;
        addTrustedSigner(msg.sender); // Admin is automatically a trusted signer
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier onlyTrustedSigner() {
        require(trustedSigners[msg.sender], "Only trusted signers can call this function");
        _;
    }

    function addTrustedSigner(address _signer) public onlyAdmin {
        require(!trustedSigners[_signer], "Already a trusted signer");
        trustedSigners[_signer] = true;
        numTrustedSigners++;
        emit TrustedSignerAdded(_signer);
    }

    function removeTrustedSigner(address _signer) external onlyAdmin {
        require(trustedSigners[_signer], "Not a trusted signer");
        require(_signer != admin, "Cannot remove admin as trusted signer");
        trustedSigners[_signer] = false;
        numTrustedSigners--;
        emit TrustedSignerRemoved(_signer);
    }

    function updateQuorumPercentage(uint256 _newPercentage) external onlyAdmin {
        require(_newPercentage > 0 && _newPercentage <= 10, "Invalid quorum percentage");
        quorumPercentage = _newPercentage;
        emit QuorumPercentageUpdated(_newPercentage);
    }

    function createDispute(uint256 _listingId) external {
        disputeCounter++;
        disputes[disputeCounter] = Dispute(disputeCounter, _listingId, msg.sender, false, address(0));
        emit DisputeCreated(disputeCounter, _listingId, msg.sender);
    }

    function voteOnDispute(uint256 _disputeId, address resolution) external onlyTrustedSigner {
        require(!disputes[_disputeId].resolved, "Dispute already resolved");
        require(!votes[_disputeId][msg.sender], "Already voted");

        votes[_disputeId][msg.sender] = true;
        voteCounts[_disputeId]++;

        // Calculate required votes for quorum
        uint256 requiredVotes = (numTrustedSigners * quorumPercentage) / 10;
        
        // Check if quorum is reached
        if (voteCounts[_disputeId] >= requiredVotes) {
            disputes[_disputeId].resolved = true;
            disputes[_disputeId].resolution = resolution;
            emit DisputeResolved(_disputeId, resolution);
        }
    }

    // View function to check if quorum is reached for a dispute
    function isQuorumReached(uint256 _disputeId) public view returns (bool) {
        uint256 requiredVotes = (numTrustedSigners * quorumPercentage) / 10;
        return voteCounts[_disputeId] >= requiredVotes;
    }
}