import { useEffect, useRef } from "react";
import "./App.css";
// import sampleNft from "./assets/nfts/yacht-club-monkey.png";

import WebApp from "@twa-dev/sdk";
import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { NftGrid } from "./components/NftGrid";
import { useNfts } from "./hooks/useNft";

function App() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const walletRef = useRef(wallet);
  const { nfts, loading, error } = useNfts(wallet);

  useEffect(() => {
    walletRef.current = wallet;
    WebApp.MainButton.setText(wallet ? "Disconnect" : "Connect Wallet");
  }, [wallet]);

  useEffect(() => {
    WebApp.MainButton.onClick(() => {
      if (walletRef.current) {
        console.log("'Disconnect' was clicked");
        tonConnectUI.disconnect();
      } else {
        console.log("'Connect Wallet' was clicked");
        tonConnectUI.openModal();
      }
    });
    WebApp.MainButton.show();
  }, []);

  return (
    <>
      <main className="main">
        {loading && <p>Loading NFTs...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && <NftGrid data={nfts} />}
        <TonConnectButton />
      </main>
    </>
  );
}

export default App;
