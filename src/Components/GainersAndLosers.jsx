import { useState, useEffect } from "react";
import { gainersAndLosers } from "../../api";

const GainersAndLosers = () => {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const limitToThree = (array) => array.slice(0, 3);
  
  useEffect(() => {

    const fetchGainersAndLosers = async () => {
      try {
        const data = await gainersAndLosers();

        if (data) {
          setGainers(limitToThree(data.top_gainers));
          setLosers(limitToThree(data.top_losers));
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching gainers and losers:", error);
        setIsLoading(false);
      }
    };

    fetchGainersAndLosers();
  }, []);
  return (
    <div className="gainers-losers-container">
      <div className="gainers-box">
        <h3>Top Gainers</h3>
        <ul>
          {gainers.map((stock, index) => (
            <li key={index}>
              <strong>{stock.ticker}</strong>: ${stock.price} -{" "}
              {stock.change_percentage}%
            </li>
          ))}
        </ul>
      </div>
      <div className="losers-box">
        <h3>Top Losers</h3>
        <ul>
          {losers.map((stock, index) => (
            <li key={index}>
              <strong>{stock.ticker}</strong>: ${stock.price} -{" "}
              {stock.change_percentage}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GainersAndLosers;
