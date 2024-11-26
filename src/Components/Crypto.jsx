import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCoinDetails } from "../../api";
import formatMarketCap from "../Functions/formatMcap";
import CryptoChart from "./CryptoChart";
import Statbox from "./CryptoStatBox";

const Crypto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const handleBackClick = () => {
    navigate(-1);
  };
  const handleBuyClick = () => {
    if (coinData) {
      const buyUrl = `https://www.binance.com/en-GB/trade/${coinData.symbol.toUpperCase()}_USDT?type=spot`;
      window.open(buyUrl, "_blank");
    }
  };
  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <div className="coin-page">
      <button className="direction-button" onClick={handleBackClick}>Back</button>
      <div className="coin-header">
        <img
          src={coinData.image.large}
          alt={`${coinData.id} logo`}
          className="coin-logo"
        />
        <h1 className="coin-name">{coinData.name}</h1>
        <div className="percent-change-box">
          <h2>
            {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
          </h2>
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

      <CryptoChart coinId={coinData.id} />

      <Statbox />

      <button className="buy-button" onClick={handleBuyClick}>
        Buy
      </button>
    </div>
  );
};

export default Crypto;
