import axios from "axios";

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

export {getCoinMarkets}
