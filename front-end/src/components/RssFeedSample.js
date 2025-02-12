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
        const itemsArray = Array.from(xml.querySelectorAll("item")).map((item) => ({
          title: item.querySelector("title").textContent,
          link: item.querySelector("link").textContent,
          description: item.querySelector("description").textContent,
        }));

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
                {item.title}
              </a>
            </h3>
            <p>{item.description}</p>
          </div>
        ))
      )}
    </div>
  );
}
