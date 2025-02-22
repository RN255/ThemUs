import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import skyNewsFavicon from "../assets/newsFavicons/skyNewsFavicon.ico";
import bbcNewsFavicon from "../assets/newsFavicons/bbcNewsFavicon.ico";
import guardianFavicon from "../assets/newsFavicons/guardianFavicon.ico";
import dailyMailFavicon from "../assets/newsFavicons/dailyMailFavicon.ico";
import gbNewsFavicon from "../assets/newsFavicons/gbNewsFavicon.png";
import BreitbartFavicon from "../assets/newsFavicons/BreitbartFavicon.ico";

import IndependentFavicon from "../assets/newsFavicons/independentFavicon.ico";
import MirrorFavicon from "../assets/newsFavicons/mirrorFavicon.ico";
import ItvFavicon from "../assets/newsFavicons/itvFavicon.ico";

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
    Left: news.filter((article) =>
      ["Guardian", "Independent", "Mirror"].includes(article.source)
    ),
    Centre: news.filter((article) =>
      ["BBC", "Sky News", "ITV"].includes(article.source)
    ),
    Right: news.filter((article) =>
      ["GB News", "Daily Mail", "Breitbart"].includes(article.source)
    ),
  };

  // Favicon mapping
  const faviconMap = {
    Guardian: guardianFavicon,
    Independent: IndependentFavicon,
    Mirror: MirrorFavicon,

    "Sky News": skyNewsFavicon,
    BBC: bbcNewsFavicon,
    ITV: ItvFavicon,

    "Daily Mail": dailyMailFavicon,
    "GB News": gbNewsFavicon,
    Breitbart: BreitbartFavicon,
  };

  // radio button info
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "All", value: "1" },
    { name: "Economy", value: "2" },
    { name: "Ukraine", value: "3" },
    { name: "UK", value: "4" },
    { name: "International", value: "5" },
  ];

  // select a category
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Update radio button handler to set selectedCategory
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  return (
    <div className="container mt-4 p-0">
      <h2 className="border-bottom pb-4 mb-4">Latest UK News Feed</h2>

      <ButtonGroup className="mb-4 d-flex flex-wrap">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            className={
              radioValue === radio.value
                ? "selectedRadioButton me-2 mt-1 rounded"
                : "clearRadioButton me-2 mt-1 rounded"
            }
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => {
              setRadioValue(e.currentTarget.value);
              handleCategoryChange(radio.name);
            }}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>

      {error && <p className="alert alert-danger">{error}</p>}

      <div className="row">
        {Object.entries(categorizedNews).map(([source, articles]) => {
          // Filter articles based on selected category
          const filteredArticles =
            selectedCategory === "All"
              ? articles
              : articles.filter(
                  (article) => article.category === selectedCategory
                );

          return (
            <div key={source} className="col-4 px-0 px-md-2">
              <h3 className="text-center">{source}</h3>
              {filteredArticles.map((article) => (
                <Card className="noBorderCustomCard my-2" key={article._id}>
                  <Card.Body className="px-2">
                    <Card.Text className="m-0">
                      <img
                        src={
                          faviconMap[article.source] || "/favicons/default.ico"
                        }
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
                  </Card.Body>
                </Card>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NewsList;
