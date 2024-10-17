function formatMarketCap(marketCap) {
    if (marketCap >= 1e12) { 
        return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) { 
        return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) { 
        return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
        return `$${marketCap}`; 
    }
}

export default formatMarketCap
