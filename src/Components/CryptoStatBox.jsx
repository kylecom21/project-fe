import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCoinDetails } from "../../api";
import formatMarketCap from "../Functions/formatMcap";

const Statbox = () => {
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
    <div className="stats-box">
      <div className="stat">
        <span className="stat-title">24h High</span>
        <span className="stat-value">${coinData.market_data.high_24h.usd}</span>
      </div>
      <div className="stat">
        <span className="stat-title">24h Low</span>
        <span className="stat-value">${coinData.market_data.low_24h.usd}</span>
      </div>
      <div className="stat">
        <span className="stat-title">ATH</span>
        <span className="stat-value">
          {formatMarketCap(coinData.market_data.ath.usd)}
        </span>
      </div>
      <div className="stat">
        <span className="stat-title">Circulating Supply</span>
        <span className="stat-value">
          {formatMarketCap(coinData.market_data.circulating_supply)}
        </span>
      </div>
      <div className="stat">
        <span className="stat-title">Total Supply</span>
        <span className="stat-value">
          {formatMarketCap(coinData.market_data.total_supply)}
        </span>
      </div>
      <div className="stat">
        <span className="stat-title">Market Cap Change (24h)</span>
        <span className="stat-value">
          {coinData.market_data.market_cap_change_percentage_24h}%
        </span>
      </div>
    </div>
  );
};

export default Statbox
