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
    <div className="news">
      <h2>Top Financial News</h2>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <img src={article.image} className="news-thumbnail" alt={article.index}></img>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <strong>{article.headline}</strong>
            </a>
            <p>{article.summary}</p>
            <small>{new Date(article.datetime * 1000).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialNews
