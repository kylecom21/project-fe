import { useEffect, useState } from "react";
import GainersAndLosers from "./GainersAndLosers";
import FinancialNews from "./FinancialNews";
import StockSearch from "./StockSearch";

const Stocks = () => {
  return (
    <div>
      <GainersAndLosers />
      <StockSearch/>
      <FinancialNews />
    </div>
  );
};

export default Stocks;
