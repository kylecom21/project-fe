import { Link } from "react-router-dom";
import { getCoinMarkets, getGlobalMarketData } from "../../api";
import { useState, useEffect } from "react";
import formatMarketCap from "../Functions/formatMcap";
import CryptoSearch from "./CryptoSearch";

const Cryptos = () => {
  const [coinMarkets, setCoinMarkets] = useState([]);
  const [btcDominance, setBtcDominance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coinMarketsData = await getCoinMarkets();
        const globalData = await getGlobalMarketData();

        setCoinMarkets(coinMarketsData);
        setBtcDominance(globalData?.data?.market_cap_percentage?.btc);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <div>
      <div className="btc-dominance-container">
        <h2 className="btc-dominance-title">BTC Dominance</h2>
        <p className="btc-dominance-value">{btcDominance.toFixed(2)}%</p>
      </div>
      <div>
        {coinMarkets.map((coin) => {
          return <p key={coin.id}>{coin.market_cap_percentage}</p>;
        })}
      </div>
      <CryptoSearch />
      <div className="coins">
        <div className="scrollable-box">
          {coinMarkets.map((coin) => {
            return (
              <Link
                to={`/crypto/${coin.id}`}
                key={coin.id}
                className="coin-link"
              >
                <div className="coin-item">
                  <ul className="coin-list">
                    <li className="coin-rank">{coin.market_cap_rank}</li>
                    <li className="coin-name">{coin.symbol.toUpperCase()}</li>
                    <li className="coin-price">${coin.current_price.toFixed(2)}</li>
                    <li className="coin-marketcap">
                      {formatMarketCap(coin.market_cap)}
                    </li>
                  </ul>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cryptos;
