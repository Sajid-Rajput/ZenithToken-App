import { readContract, prepareWriteContract, writeContract } from "@wagmi/core";
import zenithToken from "../abi/ZenithToken.json";
import tokenAddress from "../contractAddress/address";

async function checkBalance(address: string | undefined) {
  const data = await readContract({
    address: `0x${tokenAddress.zenithToken}`,
    abi: zenithToken.abi,
    functionName: "balanceOf",
    args: [address],
  });

  const balance = await data;
  return balance;
}

async function transferBalance(address: string, amount: bigint) {
  const config = await prepareWriteContract({
    address: `0x${tokenAddress.zenithToken}`,
    abi: zenithToken.abi,
    functionName: "transfer",
    args: [address, amount],
  });

  await writeContract(config);
}

export { checkBalance, transferBalance };
