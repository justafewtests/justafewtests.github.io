import { useEffect, useRef } from "react";
import "./App.css";
import sampleNft from "./assets/nfts/yacht-club-monkey.png";

import WebApp from "@twa-dev/sdk";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { NFTGrid } from "./components/NFTGrid";

function App() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  const walletRef = useRef(wallet);

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
        <NFTGrid
          data={Array.from({ length: 5 }, (_, i) => ({
            id: i + 1,
            image: sampleNft,
          }))}
        />
        <NFTGrid
          data={Array.from({ length: 5 }, (_, i) => ({
            id: i + 1,
            image: sampleNft,
          }))}
        />
      </main>
    </>
  );
}

export default App;
