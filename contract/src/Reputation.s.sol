// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {MyToken} from "./NftToken.s.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// interface INftToken {
//     function safeMint(address to, string memory uri) public returns (uint256);
// }

contract ReputationSystem is Ownable /* ERC721URIStorage, NftToken, */ {
    // using Counters for Counters.Counter;

    struct Reputation {
        uint256 score;
        uint256 badges;
    }

    struct Badge {
        string badgeType;
        uint256 mintedAt;
    }
    
    MyToken immutable nftTokenAddress;

    // Counters.Counter private _tokenIds;
    mapping(address => Reputation) public reputation;
    mapping(uint256 => Badge) public badges;

    // Mapping to track badge types and their base URIs
    mapping(string => string) public badgeTypeToURI;

    event ReputationUpdated(address indexed user, uint256 score);
    event BadgeMinted(address indexed user, uint256 badgeId, string badgeType);
    event BadgeTypeAdded(string badgeType, string baseURI);

    constructor(
        address _nftTokenAddress,
        address initialOwner
    ) Ownable(initialOwner) {
        nftTokenAddress = MyToken(_nftTokenAddress);
    }

    // Add a new badge type with its metadata URI
    function addBadgeType(
        string memory _badgeType,
        string memory _baseURI
    ) external onlyOwner {
        badgeTypeToURI[_badgeType] = _baseURI;
        emit BadgeTypeAdded(_badgeType, _baseURI);
    }

    function updateReputation(address _user, uint256 _score) public onlyOwner {
        reputation[_user].score += _score;
        emit ReputationUpdated(_user, reputation[_user].score);
    }

    function mintBadge(
        address _user,
        string memory _badgeType
    ) public onlyOwner returns (uint256) {
        require(
            bytes(badgeTypeToURI[_badgeType]).length > 0,
            "Badge type does not exist"
        );

        uint256 newBadgeId = nftTokenAddress.safeMint(
            _user,
            badgeTypeToURI[_badgeType]
        );

        // _tokenIds.increment();
        // uint256 newBadgeId = _tokenIds.current();

        // _safeMint(_user, newBadgeId);
        // _setTokenURI(newBadgeId, badgeTypeToURI[_badgeType]);

        // Update reputation and badge data
        reputation[_user].badges++;
        badges[newBadgeId] = Badge({
            badgeType: _badgeType,
            mintedAt: block.timestamp
        });

        emit BadgeMinted(_user, newBadgeId, _badgeType);
        return newBadgeId;
    }

    // Get all badges owned by an address
    function getBadgesByOwner(
        address _owner
    ) external view returns (uint256[] memory) {
        uint256 badgeCount = nftTokenAddress.balanceOf(_owner);
        uint256[] memory result = new uint256[](badgeCount);
        uint256 counter = 0;

        for (uint256 i = 1; i <= nftTokenAddress.totalSupply(); i++) {
            if (
                // nftTokenAddress._exists(i) &&
                nftTokenAddress.ownerOf(i) == _owner
            ) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    // Get badge details
    function getBadgeDetails(
        uint256 _badgeId
    ) external view returns (Badge memory) {
        require(_badgeId <= nftTokenAddress.totalSupply(), "Badge does not exist");
        return badges[_badgeId];
    }

    // Override required by Solidity
    // function _burn(uint256 tokenId) internal override(ERC721URIStorage) {
    //     super._burn(tokenId);
    // }

    // // Override required by Solidity
    // function tokenURI(
    //     uint256 tokenId
    // ) public view override(ERC721URIStorage) returns (string memory) {
    //     return super.tokenURI(tokenId);
    // }

    // Allow contract to receive ETH if needed
    receive() external payable {}
}
