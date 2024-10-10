import { useEffect } from "react";

const Header = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: "FOREXCOM:SPXUSD",
          title: "S&P 500 Index",
        },
        {
          description: "Bitcoin",
          proName: "BINANCE:BTCUSD",
        },
        {
          description: "Ethereum",
          proName: "BINANCE:ETHUSD",
        },
        {
          description: "GBP/USD",
          proName: "FX:GBPUSD",
        },
        {
          description: "NASDAQ",
          proName: "NASDAQ:NDX",
        },
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "compact",
      colorTheme: "dark",
      locale: "en",
    });
    document
      .querySelector(".tradingview-widget-container__widget")
      .appendChild(script);

    return () => {
      document.querySelector(
        ".tradingview-widget-container__widget"
      ).innerHTML = "";
    };
  }, []);

  return (
      <div className="header">
        <div className="tradingview-widget-container__widget"></div>
      </div>
  );
};
export default Header;
