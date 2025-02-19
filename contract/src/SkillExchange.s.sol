// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// import "@openzeppelin/contracts/utils/Counters.sol";

contract SkillExchange is Ownable /* , ERC721 */ {
    // using Counters for Counters.Counter;
    // Counters.Counter private _tokenIds;

    struct SkillListing {
        uint256 id;
        address userAddress;
        string skillName;
        string description;
        bool isAvailable;
    }

    struct ServiceRequest {
        uint256 id;
        uint256 listingId;
        address requester;
        string description;
        uint256 deadline;
        RequestStatus status;
    }

    struct Agreement {
        uint256 id;
        uint256 requestId;
        address provider;
        address requester;
        bool providerConfirmed;
        bool requesterConfirmed;
        AgreementStatus status;
    }

    struct UserReputation {
        uint256 positivePoints;
        uint256 negativePoints;
        uint256[] completedServices;
    }

    struct Dispute {
        uint256 agreementId;
        address initiator;
        string reason;
        bool resolved;
        bool favoredProvider;
    }

    enum RequestStatus {
        Pending,
        Accepted,
        Rejected,
        InProgress,
        Completed,
        Disputed
    }
    enum AgreementStatus {
        Active,
        Completed,
        Disputed,
        Canceled
    }

    IERC20 public token;

    mapping(uint256 => SkillListing) public listings;
    mapping(uint256 => ServiceRequest) public requests;
    mapping(uint256 => Agreement) public agreements;
    mapping(uint256 => Dispute) public disputes;
    mapping(address => UserReputation) public userReputations;
    mapping(uint256 => uint256) public escrowBalances;

    ServiceRequest[] allRequest;
    
    SkillListing[] allListings;

    uint256 public listingCounter;
    uint256 public requestCounter;
    uint256 public agreementCounter;
    uint256 public disputeCounter;

    event ListingCreated(
        uint256 id,
        address indexed userAddress,
        string skillName
    );
    event ServiceRequested(uint256 id, uint256 listingId, address requester);
    event RequestStatusUpdated(uint256 id, RequestStatus status);
    event AgreementCreated(uint256 id, address provider, address requester);
    event AgreementCompleted(uint256 id);
    event DisputeRaised(uint256 id, uint256 agreementId, address initiator);
    event DisputeResolved(uint256 id, bool favoredProvider);
    event NFTMinted(address recipient, uint256 tokenId);
    event ReputationUpdated(address user, bool positive);

    constructor(IERC20 _token, address initialOwner) Ownable(initialOwner) {
        token = _token;
    }

    function createListing(
        string memory _skillName,
        string memory _description
    ) public {

        listingCounter++;

        listings[listingCounter] = SkillListing(
            listingCounter,
            msg.sender,
            _skillName,
            _description,
            true
        );

        allListings.push(SkillListing(
            listingCounter,
            msg.sender,
            _skillName,
            _description,
            true
        ));
        emit ListingCreated(listingCounter, msg.sender, _skillName);
        
    }

    function requestService(
        uint256 _listingId,
        string memory _description,
        uint256 _deadline
    ) public {
        require(listings[_listingId].isAvailable, "Listing not available");
        require(
            listings[_listingId].userAddress != msg.sender,
            "Cannot request own service"
        );

        // requests[requestCounter] = ServiceRequest(
        //     requestCounter,
        //     _listingId,
        //     msg.sender,
        //     _description,
        //     _deadline,
        //     RequestStatus.Pending
        // );

        ServiceRequest memory newRequest;

        requestCounter++;

        newRequest.requester = msg.sender;
        newRequest.listingId = _listingId;
        newRequest.description = _description;
        newRequest.status = RequestStatus.Pending;
        newRequest.id = requestCounter;
        newRequest.deadline = _deadline;
        
        requests[requestCounter] = newRequest;

        allRequest.push(newRequest);

        emit ServiceRequested(requestCounter, _listingId, msg.sender);
        
    }

    function respondToRequest(uint256 _requestId, bool _accept) public {
        ServiceRequest storage request = requests[_requestId];
        require(
            listings[request.listingId].userAddress == msg.sender,
            "Not the service provider"
        );
        require(request.status == RequestStatus.Pending, "Request not pending");

        if (_accept) {
            request.status = RequestStatus.Accepted;
            createAgreement(_requestId);
        } else {
            request.status = RequestStatus.Rejected;
        }

        emit RequestStatusUpdated(_requestId, request.status);
    }

    function createAgreement(uint256 _requestId) private {
        ServiceRequest memory request = requests[_requestId];
        agreements[agreementCounter] = Agreement(
            agreementCounter,
            _requestId,
            listings[request.listingId].userAddress,
            request.requester,
            false,
            false,
            AgreementStatus.Active
        );

        emit AgreementCreated(
            agreementCounter,
            listings[request.listingId].userAddress,
            request.requester
        );
        agreementCounter++;
    }

    function confirmCompletion(uint256 _agreementId) public {
        Agreement storage agreement = agreements[_agreementId];
        require(
            agreement.status == AgreementStatus.Active,
            "Agreement not active"
        );
        require(
            msg.sender == agreement.provider ||
                msg.sender == agreement.requester,
            "Not authorized"
        );

        if (msg.sender == agreement.provider) {
            agreement.providerConfirmed = true;
        } else {
            agreement.requesterConfirmed = true;
        }

        if (agreement.providerConfirmed && agreement.requesterConfirmed) {
            completeAgreement(_agreementId);
        }
    }

    function completeAgreement(uint256 _agreementId) private {
        Agreement storage agreement = agreements[_agreementId];
        agreement.status = AgreementStatus.Completed;

        // Mint NFT for both parties
        mintCompletionNFT(agreement.provider);
        mintCompletionNFT(agreement.requester);

        // Update reputations
        updateReputation(agreement.provider, true);
        updateReputation(agreement.requester, true);

        // Release escrow if any
        releaseEscrow(_agreementId);

        emit AgreementCompleted(_agreementId);
    }

    function raiseDispute(uint256 _agreementId, string memory _reason) public {
        Agreement storage agreement = agreements[_agreementId];
        require(
            msg.sender == agreement.provider ||
                msg.sender == agreement.requester,
            "Not authorized"
        );
        require(
            agreement.status == AgreementStatus.Active,
            "Agreement not active"
        );

        agreement.status = AgreementStatus.Disputed;
        disputes[disputeCounter] = Dispute(
            _agreementId,
            msg.sender,
            _reason,
            false,
            false
        );

        emit DisputeRaised(disputeCounter, _agreementId, msg.sender);
        disputeCounter++;
    }

    function resolveDispute(
        uint256 _disputeId,
        bool _favorProvider
    ) public onlyOwner {
        Dispute storage dispute = disputes[_disputeId];
        require(!dispute.resolved, "Dispute already resolved");

        dispute.resolved = true;
        dispute.favoredProvider = _favorProvider;

        Agreement storage agreement = agreements[dispute.agreementId];
        if (_favorProvider) {
            updateReputation(agreement.provider, true);
            updateReputation(agreement.requester, false);
        } else {
            updateReputation(agreement.provider, false);
            updateReputation(agreement.requester, true);
        }

        emit DisputeResolved(_disputeId, _favorProvider);
    }

    function mintCompletionNFT(address recipient) private {
        // _tokenIds.increment();
        // uint256 newTokenId = _tokenIds.current();
        // _safeMint(recipient, newTokenId);
        // emit NFTMinted(recipient, newTokenId);
    }

    function updateReputation(address user, bool positive) private {
        if (positive) {
            userReputations[user].positivePoints++;
        } else {
            userReputations[user].negativePoints++;
        }
        emit ReputationUpdated(user, positive);
    }

    function depositEscrow(uint256 _agreementId, uint256 _amount) public {
        Agreement memory agreement = agreements[_agreementId];
        require(
            agreement.status == AgreementStatus.Active,
            "Agreement not active"
        );
        require(
            msg.sender == agreement.requester,
            "Only requester can deposit"
        );

        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "Token transfer failed"
        );
        escrowBalances[_agreementId] += _amount;
    }

    function releaseEscrow(uint256 _agreementId) private {
        uint256 amount = escrowBalances[_agreementId];
        if (amount > 0) {
            Agreement memory agreement = agreements[_agreementId];
            escrowBalances[_agreementId] = 0;
            require(
                token.transfer(agreement.provider, amount),
                "Token transfer failed"
            );
        }
    }

    function getAllListings() external view returns(SkillListing[]) {
        require(msg.sender != address(0), "Not callable by address zero");
        return allListings;
    }


    function getAllRequests() external view returns(ServiceRequest[]) {
        require(msg.sender != address(0), "Not callable by address zero");
        return allRequest;
    }

    function getUserReputation(
        address user
    ) public view returns (uint256 positive, uint256 negative, uint256 total) {
        UserReputation memory rep = userReputations[user];
        return (
            rep.positivePoints,
            rep.negativePoints,
            rep.positivePoints + rep.negativePoints
        );
    }
    
}
