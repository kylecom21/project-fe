import { useEffect, useState } from "react";
import { fetchTop100Stocks } from "../../api";

const Stocks = () => {
  const [stockMarket, setStockMarket] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStocks = async () => {
      const topStocks = await fetchTop100Stocks();
      setStockMarket(topStocks);
      setIsLoading(false);
    };
    fetchStocks();
  }, []);
  return !isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <div>
      <h2>Stocks</h2>
      <ul>
        {stockMarket.map((stock) => (
          <li key={stock.ticker}>
            <strong>{stock.name}</strong> ({stock.ticker}) 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stocks;
