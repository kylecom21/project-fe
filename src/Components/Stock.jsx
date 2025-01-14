import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStockName } from "../../api";
import formatMarketCap from "../Functions/formatMcap";

const Stock = () => {
  const { id } = useParams();
  const [stockName, setStockName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStockName = async () => {
      try {
        const data = await getStockName(id);
        setStockName(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading stock data:", error);
        setIsLoading(false);
      }
    };
    fetchStockName();
  }, [id]);
  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <div className="stockPage">
      <div className="stockHeader">
        <img
          src={stockName.logo}
          alt={`${stockName.symbol}`}
          className="company-logo"
        />
        <h1 className="stock-name">{stockName.name}</h1>
      </div>
    </div>
  );
};

export default Stock;
