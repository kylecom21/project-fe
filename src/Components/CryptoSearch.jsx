import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchCoins } from "../../api";

const CryptoSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    if (event.key === "Enter") {
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
    }
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
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default CryptoSearch;
