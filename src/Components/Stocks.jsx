import { useEffect, useState } from "react";
import GainersAndLosers from "./GainersAndLosers";
import FinancialNews from "./FinancialNews";

const Stocks = () => {
  return (
    <div>
      <h1>Stocks Homepage</h1>
      <GainersAndLosers />
      <FinancialNews />
    </div>
  );
};

export default Stocks;
