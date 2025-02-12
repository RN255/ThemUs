import React, { useState, useEffect } from "react";

export default function RssFeedSample() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRSS() {
      try {
        const response = await fetch("http://localhost:5000/rss"); // Adjust URL for production
        const text = await response.text(); // RSS is in XML format
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");

        // Parse the XML and extract the items
        const itemsArray = Array.from(xml.querySelectorAll("item")).map(
          (item) => {
            // Extract description with CDATA
            const description = item.querySelector("description").textContent;

            // Parse the description as HTML to find an <img> tag
            const descriptionParser = new DOMParser();
            const descriptionDoc = descriptionParser.parseFromString(
              description,
              "text/html"
            );
            const imageUrl = descriptionDoc.querySelector("img")
              ? descriptionDoc.querySelector("img").getAttribute("src")
              : null; // Get image from <img> tag inside description if available

            return {
              title: item.querySelector("title").textContent,
              link: item.querySelector("link").textContent,
              description: description, // Keep the raw description (HTML)
              image: imageUrl, // Will be null if no image is found
            };
          }
        );

        setItems(itemsArray); // Set the items to state
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      } finally {
        setLoading(false); // Set loading to false once done
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
