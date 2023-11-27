import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { polygonMumbai } from "@wagmi/core/chains";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import { TokenApp } from "./components/TokenApp";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey: String(import.meta.env.VITE_ALCHEMY_API) })]
);

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});

// Pass config to React Context Provider
function App() {
  return (
    <div className="App">
      <WagmiConfig config={config}>
        <TokenApp />
      </WagmiConfig>
    </div>
  );
}

export default App;
