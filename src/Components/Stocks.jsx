import { useEffect, useState } from "react";
import GainersAndLosers from "./GainersAndLosers";
import FinancialNews from "./FinancialNews";

const Stocks = () => {
  return (
    <div>
      <GainersAndLosers />
      <FinancialNews />
    </div>
  );
};

export default Stocks;
