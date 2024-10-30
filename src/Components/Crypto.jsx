import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCoinDetails } from "../../api";
import formatMarketCap from "../Functions/formatMcap";

const Crypto = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const data = await getCoinDetails(id);
        setCoinData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading coin data:", error);
        setIsLoading(false);
      }
    };

    fetchCoinData();
  }, [id]);
  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <div className="coin-page">
      <div className="coin-header">
        <img
          src={coinData.image.large}
          alt={`${coinData.id} logo`}
          className="coin-logo"
        />
        <h1>{coinData.name}</h1>
        <div className="coin-details">
        <div className="percent-change-box">
          <h2>{coinData.market_data.price_change_percentage_24h}%</h2>
        </div>
        </div>
      </div>
      <div className="crypto-stats">
        <p>
          <strong>Price: </strong> $
          {coinData.market_data.current_price.usd.toLocaleString()}
        </p>
        <p>
          <strong>Market Cap: </strong>
          {formatMarketCap(coinData.market_data.market_cap.usd)}
        </p>
        <p>
          <strong>Volume: </strong>
          {formatMarketCap(coinData.market_data.total_volume.usd)}
        </p>
      </div>
      <button className="buy-button">Buy</button>
    </div>
  );
};

export default Crypto;
