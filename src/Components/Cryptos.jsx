import { Link } from "react-router-dom";
import { getCoinMarkets } from "../../api";
import { useState, useEffect } from "react";
import formatMarketCap from "../Functions/formatMcap";
import CryptoSearch from "./CryptoSearch";

const Cryptos = () => {
  const [coinMarkets, setCoinMarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCoinMarkets().then((coinMarkets) => {
      setCoinMarkets(coinMarkets);
      setIsLoading(false);
    }),
      [];
  });
  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <div>
      <div>
        {coinMarkets.map((coin) => {
          return (
          <p>{coin.market_cap_percentage}</p>
          )})}
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
                    <li className="coin-price">${coin.current_price}</li>
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
