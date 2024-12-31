// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/Test.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";




contract SkillExchange {
    struct SkillListing {
        uint256 id;
        address userAddress;
        string skillName;
        string description;
        bool offerType; // true: offer, false: request
        uint8 status; // 0: active, 1: completed, 2: canceled
    }

    struct Agreement {
        uint256 id;
        address provider;
        address requester;
        string terms;
        uint256 deadline;
        uint8 status; // 0: pending, 1: active, 2: completed, 3: canceled
    }

    mapping(uint256 => SkillListing) public listings;
    mapping(uint256 => Agreement) public agreements;
    uint256 public listingCounter;
    uint256 public agreementCounter;

     IERC20 public token; 
     mapping(uint256 => uint256) public escrowBalances;


    event ListingCreated(uint256 id, address indexed userAddress, string skillName);
    event AgreementInitiated(uint256 id, address provider, address requester);
    event AgreementCompleted(uint256 id);
     event AgreementCanceled(uint256 id);

     constructor(IERC20 _token) {
        token = _token;
    }

    function createListing(
        string memory _skillName,
        string memory _description,
        bool _offerType
    ) public {
        listings[listingCounter] = SkillListing(
            listingCounter,
            msg.sender,
            _skillName,
            _description,
            _offerType,
            0
        );
        emit ListingCreated(listingCounter, msg.sender, _skillName);
        listingCounter++;
    }

    function initiateAgreement(
        uint256 _listingId,
        string memory _terms,
        uint256 _deadline
    ) public {
        SkillListing memory listing = listings[_listingId];
        require(listing.status == 0, "Listing not active");
        require(listing.userAddress != msg.sender, "Cannot initiate with self");

        agreements[agreementCounter] = Agreement(
            agreementCounter,
            listing.userAddress,
            msg.sender,
            _terms,
            _deadline,
            0
        );

        emit AgreementInitiated(agreementCounter, listing.userAddress, msg.sender);
        agreementCounter++;
    }

    function completeAgreement(uint256 _agreementId) public {
        Agreement storage agreement = agreements[_agreementId];
        require(
            msg.sender == agreement.provider || msg.sender == agreement.requester,
            "Not authorized"
        );
        require(agreement.status == 0, "Agreement not active");

        agreement.status = 2;
        emit AgreementCompleted(_agreementId);
    }

    function cancelAgreement(uint256 _agreementId) public {
        Agreement storage agreement = agreements[_agreementId];
        require(agreement.status == 0, "Agreement not active");
        require(
            block.timestamp > agreement.deadline,
            "Cannot cancel before the deadline"
        );
        require(
            msg.sender == agreement.requester,
            "Only requester can cancel the agreement"
        );

        agreement.status = 3; // Canceled
        emit AgreementCanceled(_agreementId);
    }

    function depositEscrow(uint256 _agreementId, uint256 _amount) public {
        Agreement memory agreement = agreements[_agreementId];
        require(agreement.status == 0, "Agreement not active");
        require(msg.sender == agreement.requester, "Only requester can deposit");

        require(token.transferFrom(msg.sender, address(this), _amount), "Token transfer failed");
        escrowBalances[_agreementId] += _amount;
    }

    function releaseEscrow(uint256 _agreementId) public {
        Agreement storage agreement = agreements[_agreementId];
        require(agreement.status == 2, "Agreement not completed");
        require(msg.sender == agreement.provider || msg.sender == agreement.requester, "Not authorized");

        uint256 amount = escrowBalances[_agreementId];
        escrowBalances[_agreementId] = 0;
        require(token.transfer(agreement.provider, amount), "Token transfer failed");
    }

}