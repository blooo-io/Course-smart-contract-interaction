import { ethers } from "ethers";
import IntellectualProperties  from '../../../backend/artifacts/contracts/IntellectualProperties.sol/IntellectualProperties.json'

export default function getContract(): any {
  const provider = new ethers.providers.Web3Provider( (window as any).ethereum);
  const signer = provider.getSigner();

  return new ethers.Contract(
    "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    IntellectualProperties.abi,
    signer
  );
}