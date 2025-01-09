import { useState } from "react";
import { searchStocks } from "../../api";
import { useNavigate } from "react-router-dom";

const StockSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleSearch = async (e) => {
        const query = e.target.value.trim();
        setSearchTerm(query);

    if (query.length > 2) {
        setIsLoading(true);
        try {
          const stocks = await searchStocks(query);
    
          // Filter only relevant results containing the query
          const filteredStocks = stocks.filter((stock) =>
            stock.ticker.toLowerCase().includes(query.toLowerCase())
          );
    
          setResults(filteredStocks);
        } catch (error) {
          console.error("Error fetching stock data:", error);
        }
        setIsLoading(false);
      } else {
        setResults([]); 
      }
    }
  
    const handleSelectStock = (ticker) => {
      navigate(`/stocks?ticker=${ticker}`);
    };
  
    return (
      <div className="stock-search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for a stock..."
          className="stock-search-input"
        />
        {isLoading && <p>Loading...</p>}
        <ul className="stock-search-results">
          {results.map((stock, index) => (
            <li key={index} onClick={() => handleSelectStock(stock.ticker)}>
              {stock.ticker} - {stock.name}
            </li>
          ))}
        </ul>
        <button onClick={handleButtonClick} className="search-button">
        <img
          src="src/imgs/search-icon.png"
          alt="Search"
          className="search-icon"
        />
      </button>
      </div>
    );
}

export default StockSearch;
