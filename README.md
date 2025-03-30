Web3 Credit Score System

Overview: 

This is a decentralized credit scoring system built on the blockchain. It assigns credit scores based on on-chain activity such as DAO participation, loan repayment, and defaults. The system operates fully on-chain, ensuring transparency and decentralization.

Features: 

Fetch user credit scores from the blockchain.
Update credit scores based on DAO participation.
adjust credit scores based on loan repayment and defaults.
Fully on-chain implementation using Solidity.
Frontend built with React for a user-friendly interface.

Tech Stack: 

Smart Contract: Solidity; 
Frontend: React, Ethers.js;  
Blockchain: Sepolia Ethereum Testnet


Smart Contract

The contract includes the following key functions:

getCreditScore(address user): Returns the credit score of a user.
reportDAOParticipation(): Increases credit score for active DAO participation.
reportLoanRepayment(): Increases credit score for successful loan repayment.
reportLoanDefault(): Decreases credit score for loan defaults

Usage: 

Connect MetaMask to the frontend.
Click "Get Credit Score" to fetch your current score.
Perform actions like DAO participation or loan repayment to modify your score.

