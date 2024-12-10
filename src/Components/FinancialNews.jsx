import { useState, useEffect } from "react";
import { financialNews } from "../../api";

const FinancialNews = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      const newsData = await financialNews();
      setNews(newsData.slice(0, 3));
      setIsLoading(false);
    };

    getNews();
  }, []);

  return isLoading ? (
    <h2>Loading news...</h2>
  ) : (
    <div className="scrollable-box news-section">
      <h2>Top Financial News</h2>
      <ul className="news-list">
        {news.map((article, index) => (
          <li key={index} className="news-item">
            <img
              src={article.image}
              className="news-thumbnail"
              alt={article.index}
            ></img>
            <div className="news-content">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <strong>{article.headline}</strong>
              </a>
              <p className="news-summary">{article.summary}</p>
              <small className="news-source">
                {new Date(article.datetime * 1000).toLocaleString()}
              </small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialNews;
