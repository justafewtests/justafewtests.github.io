import { INFTGridProps, INFTItem } from "../interfaces/nft";
import "../App.css";

export function NFTGrid({ data }: INFTGridProps) {
  return (
    <>
      <div className="nft-grid-container">
        <div className="nft-grid">
          {data.map((nftItem: INFTItem, nftIndex: number) => (
            <div className="nft-item-container">
              <img className="nft-item" src={nftItem.image} key={nftIndex} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
