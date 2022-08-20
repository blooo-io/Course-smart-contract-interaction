import { ethers } from "ethers";
import IntellectualProperties  from '../../../backend/artifacts/contracts/IntellectualProperties.sol/IntellectualProperties.json'

export default function getContract(): any {
  const provider = new ethers.providers.Web3Provider( (window as any).ethereum);
  const signer = provider.getSigner();

  return new ethers.Contract(
    "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
    IntellectualProperties.abi,
    signer
  );
}