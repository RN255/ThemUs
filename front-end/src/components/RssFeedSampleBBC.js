import React, { useState, useEffect } from "react";

export default function RssFeedSample() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRSS() {
      try {
        const response = await fetch("http://localhost:5000/rss/bbcnews");
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");

        const itemsArray = Array.from(xml.querySelectorAll("item")).map(
          (item) => {
            const title =
              item.querySelector("title")?.textContent || "No Title";
            const link = item.querySelector("link")?.textContent || "#";
            const description =
              item.querySelector("description")?.textContent || "";

            // **Correctly get the thumbnail from the media:thumbnail tag:**
            const mediaThumbnail = item.getElementsByTagNameNS(
              "*",
              "thumbnail"
            )[0];
            const imageUrl = mediaThumbnail
              ? mediaThumbnail.getAttribute("url")
              : null;

            console.log("Extracted Image URL:", imageUrl); // Debugging output

            return {
              title,
              link,
              description,
              image: imageUrl,
            };
          }
        );

        setItems(itemsArray);
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRSS();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Latest RSS Feed</h2>
      {items.length === 0 ? (
        <p>No items available.</p>
      ) : (
        items.map((item, index) => (
          <div key={index} className="rss-item">
            <h3>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "25%",
                      maxHeight: "300px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </a>
              <p>{item.title}</p>
            </h3>
            {/* <div
              dangerouslySetInnerHTML={{
                __html: item.description.replace(
                  /<iframe/g,
                  `<div style="position:relative;width:100%;padding-bottom:56.25%;height:0;overflow:hidden;">
                   <iframe style="position:absolute;width:100%;height:100%;top:0;left:0;border:none;"`
                ),
              }}
            /> */}
          </div>
        ))
      )}
    </div>
  );
}
