import axios from "axios";

const polygonApi = "a4mEt291hmISkZiOyxBV_CMrDaV2Xfup";
const alphaVanageApi = "BNX37GTF0Z04YPIF";

const cryptoApi = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  headers: {
    Accept: "application/json",
    "x-cg-demo-api-key": "CG-sDgNmJyXi4hkhJ3NjZN2xG2Y",
  },
});

const getCoinMarkets = async () => {
  try {
    const response = await cryptoApi.get("/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const searchCoins = async (query) => {
  try {
    const response = await cryptoApi.get("/search", {
      params: { query },
    });
    return response.data.coins;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};

const getCoinDetails = async (id) => {
  try {
    const response = await cryptoApi.get(`/coins/${id}`, {
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching coin details:", error);
    throw error;
  }
};

const getHistoricalPriceData = async (id, currency = "usd", days = 7) => {
  try {
    const response = await cryptoApi.get(`/coins/${id}/market_chart`, {
      params: {
        vs_currency: currency,
        days: days,
      },
    });
    return response.data.prices.map((price) => ({
      x: new Date(price[0]),
      y: price[1],
    }));
  } catch (error) {
    console.error("Error fetching historical price data:", error);
    throw error;
  }
};

const getGlobalMarketData = async () => {
  try {
    const response = await cryptoApi.get(`/global`);
    return response.data;
  } catch (error) {
    console.error("Error fetching global market data:", error);
    return null;
  }
};

const gainersAndLosers = async () => {
  try {
    const response = await axios.get("https://www.alphavantage.co/query", {
      params: {
        function: "TOP_GAINERS_LOSERS",
        apikey: alphaVanageApi,
      },
    });
    if (response.status === 200) {
      const data = response.data;
      console.log(data);
      return data;
    } else {
      console.error("Unexpected status code:", response.status);
    }
  } catch (error) {
    console.error("Error fetching top gainers and losers:", error);
  }
};

const financialNews = async () => {
  try {
    const response = await axios.get("https://www.alphavantage.co/query", {
      params: {
        function: "NEWS_SENTIMENT",
        apikey: alphaVanageApi,
      },
    });
    if (response.status === 200) {
      const data = response.data;
      console.log(data);
      return data;
    } else {
      console.error("Unexpected status code:", response.status);
    }
  } catch (error) {
    console.error("Error fetching top gainers and losers:", error);
  }
}

export default {gainersAndLosers, financialNews}

export{
  getCoinMarkets,
  searchCoins,
  getCoinDetails,
  getHistoricalPriceData,
  getGlobalMarketData,
};
