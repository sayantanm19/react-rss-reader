import React, { useState, createContext } from "react";

export const SourcesContext = createContext();

export function SourcesProvider(props) {
  const [sources, setSources] = useState([
    {
      name: "TechCrunch",
      rsslink: "https://techcrunch.com/feed/",
      enabled: true,
    },
    {
      name: "TechMeme",
      rsslink: "https://www.techmeme.com/feed.xml",
      enabled: true,
    },
    {
      name: "NYTimes Technology",
      rsslink: "http://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
      enabled: true,
    },
    {
      name: "Wired",
      rsslink: "https://www.wired.com/feed/rss",
      enabled: true,
    },
    {
      name: "Dev.to Main",
      rsslink: "https://dev.to/feed/",
      enabled: false
    }
  ]);

  return (
    <SourcesContext.Provider value={[sources, setSources]}>
      {props.children}
    </SourcesContext.Provider>
  );
}
