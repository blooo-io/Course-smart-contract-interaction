import { ethers } from "ethers";
import IntellectualProperties  from '../../../backend/artifacts/contracts/IntellectualProperties.sol/IntellectualProperties.json'

export default function getContract(): any {
  const provider = new ethers.providers.Web3Provider( (window as any).ethereum);
  const signer = provider.getSigner();

  return new ethers.Contract(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    IntellectualProperties.abi,
    signer
  );
}