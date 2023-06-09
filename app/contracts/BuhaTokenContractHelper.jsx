import { ethers } from "ethers";
import { getJsonRpcEssentials, getWeb3Essentials } from "./helpers";
import buhaTokenAbi from "../abi/BuhaToken.json";
import { buhaToken } from "./../genAddresses.json";

async function getBuhaTokenReadContract() {
  let { jsonRpcProvider } = await getJsonRpcEssentials();

  const buhaTokenReadContract = new ethers.Contract(
    buhaToken,
    buhaTokenAbi,
    jsonRpcProvider
  );

  return { buhaTokenReadContract };
}

async function getBuhaTokenWriteContract() {
  let { web3Signer } = await getWeb3Essentials();

  const buhaTokenReadContract = new ethers.Contract(
    buhaToken,
    buhaTokenAbi,
    web3Signer
  );
  let buhaTokenWriteContract = buhaTokenReadContract.connect(web3Signer);

  return { buhaTokenWriteContract };
}

export { getBuhaTokenReadContract, getBuhaTokenWriteContract };
