import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function NewsList() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/news/news")
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch news articles.");
      });
  }, []);

  const categorizedNews = {
    Left: news.filter((article) => article.source === "Guardian"),
    Centre: news.filter((article) =>
      ["BBC", "SkyNews"].includes(article.source)
    ),
    Right: news.filter((article) => article.source === "GBNews"),
  };

  return (
    <div className="container mt-4">
      <h2>Latest News</h2>
      {error && <p className="alert alert-danger">{error}</p>}
      <div className="row">
        {Object.entries(categorizedNews).map(([source, articles]) => (
          <div key={source} className="col-4">
            <h3 className="text-center">{source}</h3>
            {articles.map((article) => (
              <div key={article._id} className="card mb-3">
                <div className="card-body">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h5 className="card-title">{article.title}</h5>
                  </a>
                  <p>{article.source}</p>
                  <p className="card-text">
                    Published on:{" "}
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsList;
