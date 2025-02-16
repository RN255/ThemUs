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
    SkyNews: news.filter((article) => article.source === "SkyNews"),
    BBC: news.filter((article) => article.source === "BBC"),
    GBNews: news.filter((article) => article.source === "GBNews"),
  };

  return (
    <div className="container mt-4">
      <h2>Latest News</h2>
      {error && <p className="alert alert-danger">{error}</p>}
      <div className="row">
        {Object.entries(categorizedNews).map(([source, articles]) => (
          <div key={source} className="col-md-4">
            <h3 className="text-center">{source}</h3>
            {articles.map((article) => (
              <div key={article._id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">
                    Published on:{" "}
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
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
