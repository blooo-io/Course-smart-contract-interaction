import { ethers } from "ethers";
import IntellectualProperties  from '../../../backend/artifacts/contracts/IntellectualProperties.sol/IntellectualProperties.json'

export default function getContract(): any {
  const provider = new ethers.providers.Web3Provider( (window as any).ethereum);
  const signer = provider.getSigner();

  return new ethers.Contract(
    "0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1",
    IntellectualProperties.abi,
    signer
  );
}