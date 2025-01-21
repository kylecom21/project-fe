import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStockDetails, getStockStats } from "../../api";
import formatMarketCap from "../Functions/formatMcap";

const Stock = () => {
  const { id } = useParams();
  const [stockDetails, setStockDetails] = useState(null);
  const [stockStats, setStockStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const [details, stats] = await Promise.all([
          getStockDetails(id),
          getStockStats(id),
        ]);
        setStockDetails(details);
        setStockStats(stats.results[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setIsLoading(false);
      }
    };
    fetchStock();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const logoUrl = `https://img.logo.dev/ticker/${id}?token=pk_ZcW_ygF-RjCy5dJyw9pu5g&retina=true`;

  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <div className="coin-page">
      <button className="direction-button" onClick={handleBackClick}>
        Back
      </button>
      <div className="coin-header">
        <img
          src={logoUrl}
          alt={`${stockDetails.symbol}`}
          className="coin-logo"
        />
        <h1 className="coin-name">{stockDetails.name}</h1>
        <div className="percent-change-box">
          <h2>
            {(((stockStats.c - stockStats.o) / stockStats.o) * 100).toFixed(2)}%
          </h2>
        </div>
      </div>
      <div className="cypto-stats">
        <p>
          <strong>Price: </strong> ${stockStats.c.toFixed(2)}
        </p>
        <p>
          <strong>Market Cap: </strong>
          {formatMarketCap(stockDetails.market_cap)}
        </p>
        <p>
          <strong>Volume: </strong>
          {formatMarketCap(stockStats.v)}
        </p>
      </div>
    </div>
  );
};

export default Stock;
