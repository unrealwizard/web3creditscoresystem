import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./constants";

async function getCreditScore() {
  if (!window.ethereum) {
    alert("🦊 MetaMask not detected! Please install MetaMask.");
    return;
  }

  try {
    // Connect to MetaMask
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Load smart contract
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    console.log("🔍 Fetching credit score...");
    const userAddress = await signer.getAddress();
    const score = await contract.getCreditScore(userAddress);

    console.log("✅ Credit Score:", score.toString());
    alert(`Your Credit Score: ${score.toString()}`);
  } catch (error) {
    console.error("❌ Error fetching credit score:", error);
    alert("Error fetching credit score. Check console.");
  }
}

export default getCreditScore;
