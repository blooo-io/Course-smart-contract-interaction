import { ethers } from "ethers";
import vehiculeABI  from './Vehicule.abi.json'

console.log(vehiculeABI);

export default function getContract(): any {
  const provider = new ethers.providers.Web3Provider( (window as any).ethereum);
  const signer = provider.getSigner();

  return new ethers.Contract(
    "0x44bCF93bc80B9497cdebBd30031C8f9c90D2A7CA",
    vehiculeABI,
    signer
  );
}