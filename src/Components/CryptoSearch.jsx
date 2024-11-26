import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchCoins } from "../../api";

const CryptoSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  const handleSearch = async (event) => {
    if (event.type === "keydown" && event.key !== "Enter") {
      return; 
    }

    const query = searchTerm.trim();
    if (query) {
      try {
        const results = await searchCoins(query);
        if (results.length > 0) {
          const coinId = results[0].id;
          navigate(`/crypto/${coinId}`);
        } else {
          console.error("No coins found.");
        }
      } catch (error) {
        console.error("Error during search:", error);
      }
    }
  };

  const handleButtonClick = (event) => {
    event.preventDefault();  
    handleSearch(event);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for a cryptocurrency..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
        className="search-input"
      />
      <button onClick={handleButtonClick} className="search-button">
        <img
          src="src/imgs/search-icon.png"
          alt="Search"
          className="search-icon"
        />
      </button>
    </div>
  );
};

export default CryptoSearch;
