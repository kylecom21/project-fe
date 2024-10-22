import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <input
        type="text"
        placeholder="Search for a cryptocurrency..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
        className="search-input"
      />
    </div>
  );
};

export default CryptoSearch;
