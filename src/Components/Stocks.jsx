import { useEffect, useState } from "react";
import { fetchSpecificStocks } from "../../api";

const Stocks = () => {
  const [topStocks, setTopStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tickers = ["AAPL", "NVDA", "MSFT", "AMZN", "GOOG","2222.SR","META","TSLA","BRK-B","AVGO"]
    const stocks = async () => {
      const stockData = await fetchSpecificStocks(tickers);
      setTopStocks(stockData);
      setIsLoading(false);
    };
    stocks();
  }, []);

  return isLoading ? (
    <h2>Loading stocks...</h2>
  ) : (
    <div className="stocks-list">
      <h2>Stocks</h2>
      <ul>
        {topStocks.map((stock) => (
          <li key={stock.ticker}>
            <strong>{stock.ticker}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stocks;
