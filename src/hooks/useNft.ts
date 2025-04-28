import { useEffect, useState } from "react";
import { Wallet, WalletInfoWithOpenMethod } from "@tonconnect/ui-react";
import { INftItem } from "../interfaces/nft";

export interface NftResponse {
  nft_items: NftItem[];
}

export interface NftItem {
  address: string;
  index: number;
  owner: NftOwner;
  collection?: NftCollection;
  metadata?: Record<string, any>;
  sale?: NftSale;
  previews?: NftPreview[];
  dns?: string;
  approved_by?: string[]; // deprecated
  include_cnft?: boolean;
  trust?: "whitelist" | "graylist" | "blacklist" | "none";
}

export interface NftOwner {
  address: string;
  name?: string;
  is_scam?: boolean;
  icon?: string;
  is_wallet?: boolean;
}

export interface NftCollection {
  address: string;
  name?: string;
  description?: string;
  verified?: boolean;
}

export interface NftSale {
  address: string;
  market: NftMarket;
  owner: NftOwner;
  price: NftPrice;
}

export interface NftMarket {
  address: string;
  name?: string;
  is_scam?: boolean;
  icon?: string;
  is_wallet?: boolean;
}

export interface NftPrice {
  value: string;
  token_name: string;
}

export interface NftPreview {
  resolution: string;
  url: string;
}

export function useNfts(
  wallet: Wallet | (Wallet & WalletInfoWithOpenMethod) | null
) {
  console.log("inside useNfts: ", wallet);
  const [nfts, setNfts] = useState<INftItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNFTs() {
      if (!wallet) {
        setNfts([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://testnet.tonapi.io/v2/accounts/${wallet.account.address}/nfts?limit=10&indirect_ownership=false`
        );

        const data: NftResponse = await res.json();

        const items = data.nft_items || [];

        const formatted: INftItem[] = items.map((item) => {
          const preview = item.previews?.find(
            (p) => p.resolution === "100x100"
          );
          return {
            address: item.address,
            image: preview ? preview.url : "",
          };
        });

        setNfts(formatted);
      } catch (err) {
        console.error("Failed to fetch NFTs:", err);
        setError("Failed to load NFTs");
      } finally {
        setLoading(false);
      }
    }

    fetchNFTs();
  }, [wallet]);

  return { nfts, loading, error };
}
