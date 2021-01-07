// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Voter {
    struct OptionPos{
        uint pos;
        bool exists;
    }
    
    uint[] public votes;
    string[] public options;
    mapping (address => bool) hasVoted;
    mapping (string => OptionPos) posOfOption;
    
    constructor(string[] memory _options) public {
        options = _options;        
        
        for(uint i = 0; i < options.length; i++)
        {
            OptionPos memory optionPos = OptionPos(i, true);
            string memory optionName = options[i];
            posOfOption[optionName] = optionPos;
            votes.push(0);
        }
    }
    
    function vote(string memory optionName) public {
        require(!hasVoted[msg.sender], "Account has already voted");
        
        // new code here
        OptionPos memory optionPos = posOfOption[optionName];
        require(optionPos.exists, "Option does not exist");
        
        votes[optionPos.pos] = votes[optionPos.pos] + 1;
        hasVoted[msg.sender] = true;
    }
    
    function vote(uint option) public {
        require(0 <= option && option < options.length, "Invalid Option");
        require(!hasVoted[msg.sender], "Account has already voted");
        
        votes[option] = votes[option] + 1;
        hasVoted[msg.sender] = true;
    }
    
    function getOptions() public view returns (string[] memory){
        return options;
    }
    
    function getVotes() public view returns (uint[] memory){
        return votes;
    }
}