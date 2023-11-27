// TokenApp.tsx
import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { parseUnits } from "viem";
import {
  checkBalance,
  transferBalance,
} from "../constants/contractFunctions/contractFunction";

import MetaMaskLogo from "../assets/MetaMask_Fox.png";
import "./TokenApp.css";

export function TokenApp() {
  const { address, connector, isConnected } = useAccount();
  const { connect, error, isLoading, pendingConnector } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const { disconnect } = useDisconnect();

  const [sendTo, setSendTo] = useState("");
  const [value, setValue] = useState("");

  const handleCheckBalance = async () => {
    try {
      const balance = await checkBalance(address);
      alert(`Balance: ${balance as any / BigInt(10) ** BigInt(18)}`);
    } catch (error) {
      console.error("Error checking balance:", error);
      alert("Error checking balance");
    }
  };

  const handleTransfer = async () => {
    try {
      const amount = parseUnits(value, 18);
      await transferBalance(String(sendTo), amount);
      alert(`Successfully transferred ${value} tokens to ${sendTo}`);
    } catch (error) {
      console.error("Error transferring tokens:", error);
      alert("Error transferring tokens");
    }
  };

  if (isConnected) {
    return (
      <div className="TokenAppContainer">
        <div className="TokenApp">
          <img
            src={MetaMaskLogo}
            alt="MetaMask Logo"
            height={100}
            width={100}
          />
          <div>Wallet {connector?.name}</div>
          <div>Connected to {address}</div>
          <button
            onClick={(event) => {
              event.preventDefault();
              disconnect();
            }}
          >
            Disconnect
          </button>
        </div>

        <div>
          <h1>Zenith Token</h1>
          <button className="check-balance-button" onClick={handleCheckBalance}>
            Check Balance
          </button>
          <h1>Transfer Token</h1>
          <input
            type="text"
            placeholder="Send To"
            value={sendTo}
            onChange={(e) => setSendTo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="deposit-button" onClick={handleTransfer}>
            Transfer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => connect()}>
        MetaMask
        {isLoading || pendingConnector ? " ( connecting)" : ""}
      </button>
      {error && <div>{error.message}</div>}
    </div>
  );
}
