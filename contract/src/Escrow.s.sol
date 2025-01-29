// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
// /home/naheem/blockchain-class/barter-skillswap/contract/lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol
// import "@openzeppelin/contracts/utils/Counters.sol";

contract SkillMarketplace is /* ERC721, */ ReentrancyGuard {
    // using Counters for Counters.Counter;
    
    struct SkillListing {
        uint256 id;
        address provider;
        string skillName;
        string description;
        uint256 price;
        bool isActive;
        uint256 deadline;
    }

    struct Order {
        uint256 id;
        uint256 listingId;
        address client;
        uint256 amount;
        uint256 deadline;
        OrderStatus status;
    }

    struct UserReputation {
        uint256 positivePoints;
        uint256 negativePoints;
        uint256 totalOrders;
        mapping(uint256 => bool) completedOrders;
    }

    enum OrderStatus {
        Pending,
        InProgress,
        Completed,
        Disputed,
        Refunded,
        Cancelled
    }

    uint256 private _tokenIds;
    uint256 private _listingIds;
    uint256 private _orderIds;

    mapping(uint256 => SkillListing) public listings;
    mapping(uint256 => Order) public orders;
    mapping(address => UserReputation) public userReputations;
    mapping(uint256 => string) public disputeReasons;

    event ListingCreated(uint256 indexed id, address provider, string skillName, uint256 price);
    event OrderPlaced(uint256 indexed orderId, uint256 listingId, address client);
    event OrderAccepted(uint256 indexed orderId);
    event OrderCompleted(uint256 indexed orderId);
    event DisputeRaised(uint256 indexed orderId, string reason);
    event NFTMinted(address indexed recipient, uint256 tokenId);
    event ReputationUpdated(address indexed user, bool isPositive);
    event FundsReleased(uint256 indexed orderId, address recipient, uint256 amount);

    constructor() {}

    modifier onlyProvider(uint256 _listingId) {
        require(listings[_listingId].provider == msg.sender, "Not the provider");
        _;
    }

    modifier onlyClient(uint256 _orderId) {
        require(orders[_orderId].client == msg.sender, "Not the client");
        _;
    }

    function createListing(
        string memory _skillName,
        string memory _description,
        uint256 _price,
        uint256 _deadline
    ) external returns (uint256) {
        require(_price > 0, "Price must be greater than 0");
        require(_deadline > block.timestamp, "Invalid deadline");

        uint256 listingId = _listingIds;
        listings[listingId] = SkillListing({
            id: listingId,
            provider: msg.sender,
            skillName: _skillName,
            description: _description,
            price: _price,
            isActive: true,
            deadline: _deadline
        });

        _listingIds++;
        emit ListingCreated(listingId, msg.sender, _skillName, _price);
        return listingId;
    }

    function placeOrder(uint256 _listingId) external payable nonReentrant returns (uint256) {
        SkillListing memory listing = listings[_listingId];
        require(listing.isActive, "Listing not active");
        require(msg.value == listing.price, "Incorrect payment amount");
        require(block.timestamp < listing.deadline, "Listing expired");

        uint256 orderId = _orderIds;
        orders[orderId] = Order({
            id: orderId,
            listingId: _listingId,
            client: msg.sender,
            amount: msg.value,
            deadline: listing.deadline,
            status: OrderStatus.Pending
        });

        _orderIds++;
        emit OrderPlaced(orderId, _listingId, msg.sender);
        return orderId;
    }

    function acceptOrder(uint256 _orderId) external onlyProvider(orders[_orderId].listingId) {
        Order storage order = orders[_orderId];
        require(order.status == OrderStatus.Pending, "Invalid order status");
        
        order.status = OrderStatus.InProgress;
        emit OrderAccepted(_orderId);
    }

    function completeOrder(uint256 _orderId) external onlyClient(_orderId) nonReentrant {
        Order storage order = orders[_orderId];
        require(order.status == OrderStatus.InProgress, "Invalid order status");
        require(block.timestamp <= order.deadline, "Deadline exceeded");

        // Release funds to provider
        address provider = listings[order.listingId].provider;
        payable(provider).transfer(order.amount);
        
        // Update status and mint NFT
        order.status = OrderStatus.Completed;
        // _mintCompletionNFT(provider);
        
        // Update reputation
        _updateReputation(provider, true);
        
        emit OrderCompleted(_orderId);
        emit FundsReleased(_orderId, provider, order.amount);
    }

    function raiseDispute(uint256 _orderId, string memory _reason) external onlyClient(_orderId) {
        Order storage order = orders[_orderId];
        require(order.status == OrderStatus.InProgress, "Invalid order status");
        require(bytes(_reason).length > 0, "Reason required");

        order.status = OrderStatus.Disputed;
        disputeReasons[_orderId] = _reason;
        
        // Refund client
        payable(msg.sender).transfer(order.amount);
        
        // Update provider reputation negatively
        _updateReputation(listings[order.listingId].provider, false);
        
        emit DisputeRaised(_orderId, _reason);
        emit FundsReleased(_orderId, msg.sender, order.amount);
    }

    // function _mintCompletionNFT(address recipient) private {
    //     _tokenIds.increment();
    //     uint256 newTokenId = _tokenIds.current();
    //     _safeMint(recipient, newTokenId);
    //     emit NFTMinted(recipient, newTokenId);
    // }

    function _updateReputation(address user, bool isPositive) private {
        UserReputation storage reputation = userReputations[user];
        if (isPositive) {
            reputation.positivePoints++;
        } else {
            reputation.negativePoints++;
        }
        //more explanation
        reputation.totalOrders++;
        emit ReputationUpdated(user, isPositive);
    }

    function getUserReputation(address user) external view returns (
        uint256 positive,
        uint256 negative,
        uint256 total
    ) {
        UserReputation storage reputation = userReputations[user];
        return (
            reputation.positivePoints,
            reputation.negativePoints,
            reputation.totalOrders
        );
    }

    // Allow contract to receive ETH
    receive() external payable {}
}