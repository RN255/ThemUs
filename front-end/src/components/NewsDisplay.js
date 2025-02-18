import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

import skyNewsFavicon from "../assets/newsFavicons/skyNewsFavicon.ico";
import bbcNewsFavicon from "../assets/newsFavicons/bbcNewsFavicon.ico";
import guardianFavicon from "../assets/newsFavicons/guardianFavicon.ico";
import dailyMailFavicon from "../assets/newsFavicons/dailyMailFavicon.ico";
import gbNewsFavicon from "../assets/newsFavicons/gbNewsFavicon.png";

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
    Left: news.filter((article) => article.source === "The Guardian"),
    Centre: news.filter((article) =>
      ["BBC", "Sky News"].includes(article.source)
    ),
    Right: news.filter((article) =>
      ["GB News", "The Daily Mail"].includes(article.source)
    ),
  };

  // Favicon mapping
  const faviconMap = {
    "Sky News": skyNewsFavicon,
    "The Guardian": guardianFavicon,
    BBC: bbcNewsFavicon,
    "The Daily Mail": dailyMailFavicon,
    "GB News": gbNewsFavicon,
  };

  return (
    <div className="container mt-4 p-0">
      <h2 className="border-bottom pb-4 mb-4">Latest UK News Feed</h2>
      {error && <p className="alert alert-danger">{error}</p>}
      <div className="row">
        {Object.entries(categorizedNews).map(([source, articles]) => (
          <div key={source} className="col-4 px-0 px-md-2">
            <h3 className="text-center">{source}</h3>
            {articles.map((article) => {
              // Set border class based on the article source
              let borderColorClass = "";
              if (article.source === "The Guardian") {
                borderColorClass = "border-none"; // Red border
              } else if (["BBC", "Sky News"].includes(article.source)) {
                borderColorClass = "border-none"; // Green border
              } else if (
                ["GB News", "The Daily Mail"].includes(article.source)
              ) {
                borderColorClass = "border-none"; // Blue border
              }

              return (
                <Card
                  className={`noBorderCustomCard my-2 ${borderColorClass}`}
                  key={article._id}
                >
                  <Card.Body className="px-2">
                    <Card.Text className="m-0">
                      <img
                        src={
                          faviconMap[article.source] || "/favicons/default.ico"
                        } // Fallback favicon for each article
                        alt={article.source}
                        width="16"
                        height="16"
                        className="me-2"
                      />
                      {article.source}
                    </Card.Text>
                    <Card.Link
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none darkblueText"
                    >
                      {article.title}
                    </Card.Link>
                    {/* Uncomment to show formatted date */}
                    {/* <Card.Text>
                    {new Date(article.publishedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </Card.Text> */}
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsList;
