import { INftGridProps, INftItem } from "../interfaces/nft";
import "../App.css";

export function NftGrid({ data }: INftGridProps) {
  return (
    <>
      <div className="nft-grid-container">
        <div className="nft-grid">
          {data.map((nftItem: INftItem, nftIndex: number) => (
            <div className="nft-item-container">
              <img className="nft-item" src={nftItem.image} key={nftIndex} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
