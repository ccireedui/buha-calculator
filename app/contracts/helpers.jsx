import { ethers } from "../node_modules/ethers/";
import detectEthereumProvider from "@metamask/detect-provider";

let provider;
(async () => {
  const result = await detectEthereumProvider();
  if (result) {
    provider = result;
  }
})();

async function getWeb3Essentials() {
  if (provider) {
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const web3Signer = web3Provider.getSigner();
    await ethereum.request({ method: "eth_requestAccounts" });

    return { web3Provider, web3Signer };
  } else {
    return { web3Provider: null, web3Signer: null };
  }
}

async function getJsonRpcEssentials() {
  const jsonRpcProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.sepolia.org"
  );
  const jsonRpcSigner = jsonRpcProvider.getSigner();

  return { jsonRpcProvider, jsonRpcSigner };
}

function toInteger18(amount) {
  return parseInt(parse18(amount));
}

function toFloat18(amount) {
  return parseFloat(parse18(amount));
}

function parse(amount, decimal) {
  return ethers.utils.parseUnits(amount.toString(), decimal);
}

function parse18(amount) {
  return ethers.utils.parseUnits(amount.toString(), 18);
}

function format(amount, decimal) {
  return ethers.utils.formatUnits(amount.toString(), decimal);
}

function format18(amount) {
  return ethers.utils.formatUnits(amount.toString(), 18);
}

export {
  toInteger18,
  toFloat18,
  parse,
  parse18,
  format,
  format18,
  getWeb3Essentials,
  getJsonRpcEssentials,
};
