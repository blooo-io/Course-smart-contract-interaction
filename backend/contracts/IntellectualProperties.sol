//SPDX-License-Identifier: Unlicense
//specific solidity cersion
pragma solidity ^0.8.7;
// we can use the console.log func from hardhat for debugging (like in javascript)
import "hardhat/console.sol";

// openzeppelin provides libaries of different use cases, this one provides a counter with best practices
// a simple way to get a counter that can only be incremented or decremented. Very useful for ID generation, counting contract activity, among others.
import "@openzeppelin/contracts/utils/Counters.sol";

contract IntellectualProperties {
    // --- Struct ---

    struct IntellectualProperty {
        uint256 id;
        string firstName;
        string lastName;
        string description;
        string fileHash;
        string fileName;
        address ownerAddress;
    }

    struct Request {
        uint256 id;
        uint256 ipId;
        uint256 index;
        address requestor;
        string description;
    }

    using Counters for Counters.Counter;
    Counters.Counter private intellectualPropertiesIds;
    Counters.Counter private requestsIds;

    // --- State Variable ---

    IntellectualProperty[] private allIntellectualProperties;
    mapping(address => IntellectualProperty[]) private intellectualProperties;
    mapping(address => IntellectualProperty[])
        private sharedIntellectualProperties;
    mapping(address => mapping(uint256 => Request)) private requests;
    mapping(address => Request[]) private requestsArray;
    mapping(uint256 => address) private accounts;

    // --- Event ---

    event ipCreated(
        address indexed intellectualPropertyAddress,
        string name,
        string lastName
    );

    event requestCreated(
        uint256 id,
        address indexed intellectualPropertyAddress,
        string description
    );

    event requestAnswered(uint256 id);

    // --- Methods ---

    function removeRequestsArray(uint256 _index, address owner) internal {
        for (uint256 i = _index; i < requestsArray[owner].length - 1; i++) {
            requestsArray[owner][i] = requestsArray[owner][i + 1];
        }
        requestsArray[owner].pop();
    }

    function createIntellectualProperty(
        string calldata _firstname,
        string calldata _lastname,
        string calldata _desc,
        string calldata _fileHash,
        string calldata _fileName
    ) external {
        require(bytes(_firstname).length > 0);
        require(bytes(_lastname).length > 0);
        require(bytes(_fileHash).length > 0);
        require(bytes(_fileName).length > 0);

        intellectualPropertiesIds.increment();
        uint256 intellectualPropertyId = intellectualPropertiesIds.current();
        address _address = address(msg.sender);
        IntellectualProperty
            memory newIntellectualProperty = IntellectualProperty(
                intellectualPropertyId,
                _firstname,
                _lastname,
                _desc,
                _fileHash,
                _fileName,
                _address
            );

        intellectualProperties[_address].push(newIntellectualProperty);
        allIntellectualProperties.push(newIntellectualProperty);
        accounts[intellectualPropertyId] = msg.sender;

        emit ipCreated(_address, _firstname, _lastname);
    }

    function getAllDeployedIntellectualProperties()
        external
        view
        returns (IntellectualProperty[] memory)
    {
        return allIntellectualProperties;
    }

    function getMyIntellectualProperties()
        external
        view
        returns (IntellectualProperty[] memory)
    {
        return intellectualProperties[msg.sender];
    }

    function requestDownload(uint256 _id, string calldata _description)
        external
    {
        requestsIds.increment();
        uint256 requestId = requestsIds.current();
        address _address = address(msg.sender);
        address ownerAddress = accounts[_id];
        uint256 length = requestsArray[ownerAddress].length;

        Request memory newRequest = Request(
            requestId,
            _id,
            length + 1,
            _address,
            _description
        );

        requests[ownerAddress][requestId] = newRequest;
        requestsArray[ownerAddress].push(newRequest);

        emit requestCreated(requestId, _address, _description);
    }

    function getAllMyRequest() external view returns (Request[] memory) {
        return requestsArray[msg.sender];
    }

    function acceptRequest(uint256 _requestID) external {
        address ownerAddress = address(msg.sender);
        Request storage request = requests[ownerAddress][_requestID];

        IntellectualProperty
            storage intellectualProperty = allIntellectualProperties[
                request.ipId - 1
            ];
        sharedIntellectualProperties[request.requestor].push(
            intellectualProperty
        );

        removeRequestsArray(request.index, ownerAddress);
        delete requests[ownerAddress][_requestID];

        emit requestAnswered(_requestID);
    }

    function declineRequest(uint256 _requestID) external {
        address ownerAddress = address(msg.sender);
        Request storage request = requests[ownerAddress][_requestID];

        removeRequestsArray(request.index, ownerAddress);
        delete requests[ownerAddress][_requestID];

        emit requestAnswered(_requestID);
    }

    function getAllMySharedIntellectualProperties()
        external
        view
        returns (IntellectualProperty[] memory)
    {
        return sharedIntellectualProperties[msg.sender];
    }
}
