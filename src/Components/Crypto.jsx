import { Link } from "react-router-dom";
import { getCoinMarkets } from "../../api";
import { useState, useEffect } from "react";

const Crypto = () => {
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
    <div className="coins">
      {coinMarkets.map((coin) => {
        return (
        <Link to={`/crypto${coin.id}`} key={coin.id}>
            <div className="coin-list">
                <li className="coin-item" key={coin.id}>
                    <p>{coin.market_cap_rank}</p>
                    <p>{coin.name}</p>
                    <p>{coin.current_price.toLocaleString()}</p>
                </li>
            </div>
        </Link>
      )})}
    </div>
  );
};

export default Crypto;
