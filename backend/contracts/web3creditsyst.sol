// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Web3CreditScore {
    mapping(address => uint256) public creditScores;
    address public admin;

    event CreditScoreUpdated(address indexed user, uint256 newScore);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can update scores");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function setCreditScore(address user, uint256 score) external onlyAdmin {
        require(score <= 100, "Score must be between 0 and 100");
        creditScores[user] = score;
        emit CreditScoreUpdated(user, score);
    }

    function getCreditScore(address user) external view returns (uint256) {
        return creditScores[user];
    }

    // User-reported Loan Repayment (for simplicity in hackathon)
    function reportLoanRepayment() external {
        require(creditScores[msg.sender] < 100, "Max score reached");
        creditScores[msg.sender] += 5; // Increase score by 5 for repayment
        emit CreditScoreUpdated(msg.sender, creditScores[msg.sender]);
    }

    // User-reported Loan Default (to reduce score)
    function reportLoanDefault() external {
        require(creditScores[msg.sender] > 0, "Min score reached");
        creditScores[msg.sender] -= 10; // Decrease score by 10 for default
        emit CreditScoreUpdated(msg.sender, creditScores[msg.sender]);
    }

    // User-reported DAO Participation (reward engagement)
    function reportDAOParticipation() external {
        require(creditScores[msg.sender] < 100, "Max score reached");
        creditScores[msg.sender] += 2; // Increase score by 2 for DAO activity
        emit CreditScoreUpdated(msg.sender, creditScores[msg.sender]);
    }
}
