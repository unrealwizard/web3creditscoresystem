import React, { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x98ceCA955777eF876f5eA21c96046068F9af7306";
const CONTRACT_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newScore",
				"type": "uint256"
			}
		],
		"name": "CreditScoreUpdated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "creditScores",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getCreditScore",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "reportDAOParticipation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "reportLoanDefault",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "reportLoanRepayment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "score",
				"type": "uint256"
			}
		],
		"name": "setCreditScore",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

function App() {
    const [creditScore, setCreditScore] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getContract() {
        if (!window.ethereum) {
            alert("MetaMask not found. Please install it.");
            return null;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        } catch (error) {
            console.error("Error connecting to contract:", error);
            alert("Failed to connect to contract.");
            return null;
        }
    }

    async function getCreditScore() {
        const contract = await getContract();
        if (!contract) return;

        try {
            setLoading(true);
            const signer = await window.ethereum.request({ method: "eth_requestAccounts" });
            const score = await contract.getCreditScore(signer[0]);
            setCreditScore(score.toString());
        } catch (error) {
            console.error("Error fetching credit score:", error);
            alert("Error fetching credit score.");
        } finally {
            setLoading(false);
        }
    }

    async function reportActivity(action) {
        const contract = await getContract();
        if (!contract) return;

        try {
            setLoading(true);
            let tx;
            if (action === "dao") {
                tx = await contract.reportDAOParticipation();
            } else if (action === "repayment") {
                tx = await contract.reportLoanRepayment();
            } else if (action === "default") {
                tx = await contract.reportLoanDefault();
            }

            await tx.wait();
            alert("Transaction successful!");
        } catch (error) {
            console.error("Error reporting activity:", error);
            alert("Transaction failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Web3 Credit Score</h1>
            <button onClick={getCreditScore} disabled={loading}>
                {loading ? "Fetching..." : "Get Credit Score"}
            </button>
            {creditScore !== null && <p>Your Credit Score: {creditScore}</p>}

            <h2>Report Activity</h2>
            <button onClick={() => reportActivity("dao")} disabled={loading}>
                {loading ? "Processing..." : "Report DAO Participation"}
            </button>
            <button onClick={() => reportActivity("repayment")} disabled={loading}>
                {loading ? "Processing..." : "Report Loan Repayment"}
            </button>
            <button onClick={() => reportActivity("default")} disabled={loading}>
                {loading ? "Processing..." : "Report Loan Default"}
            </button>
        </div>
    );
}

export default App;
