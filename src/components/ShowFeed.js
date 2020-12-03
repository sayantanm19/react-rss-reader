import React, { useEffect, useState, useContext } from "react";

import Parser from "rss-parser";

import NewsList from "./NewsList";

import { SourcesContext } from "../contexts/SourcesContext";
import { FavouritesContext } from "../contexts/FavouritesContext";
import { PreferencesContext } from "../contexts/PreferencesContext";

export default function ShowFeed() {
  const [sources, setSources] = useContext(SourcesContext);
  const [favourites, setFavourites] = useContext(FavouritesContext);
  const [preferences, setPreferences] = useContext(PreferencesContext);

  const [isLoading, setIsLoading] = useState(true);

  // Get maximum items to be displayed
  const MAX_ITEMS = preferences.maxItems;
  const parser = new Parser();

  // CORS PROXY for getting feeds
  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

  useEffect(() => {
    async function getFeeds() {
      setIsLoading(true);

      let newsItems = [];
      for (let feed of sources) {
        // Calculate amount of news to be displayed
        // per news source
        let news_per_source = Math.ceil(MAX_ITEMS / sources.length);
        news_per_source = news_per_source ? news_per_source : 1;

        if (feed.enabled) {
          try {
            let parsedFeed = await parser.parseURL(CORS_PROXY + feed.rsslink);
            // console.log(feed, parsedFeed);

            // Trim the parsed news to the value
            // of allowed items per news source
            if (parsedFeed.items.length > news_per_source)
              parsedFeed.items.length = news_per_source;

            // Add the publication and favourite field
            // for every news item
            let tmpItems = parsedFeed.items.map((item) => ({
              ...item,
              publication: parsedFeed.title,

              // Check if the item exists in the
              // favourites list
              favourited: favourites.find((itemx) => itemx.guid === item.guid)
                ? true
                : false,
            }));

            // Add to the news items array
            newsItems.push(...tmpItems);

            // Show some content to the user
            // as to get something to read while
            // the rest is loading
            // ENABLING CAUSE UNSTABLE ORDERING
            setNews(tmpItems);
          } catch {
            console.log("Some Error occured fetching from a news source!");
          }
        }
      }

      // Limit the items incase it exceeds max items
      if (newsItems.length > MAX_ITEMS) {
        console.log(newsItems.length);
        newsItems.length = MAX_ITEMS;
      }

      // Shuffle the items
      // newsItems = newsItems.sort(() => Math.random() - 0.5);

      // Sort on the basis of the date
      newsItems = newsItems.sort((a, b) => {
        return new Date(b.isoDate) - new Date(a.isoDate);
      });

      // Set the final news state
      setNews(newsItems);
      setIsLoading(false);
    }
    getFeeds();
  }, [sources]);

  const [news, setNews] = useState([]);

  return (
    <div>
      {isLoading ? (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      ) : (
        <div></div>
      )}

      {sources.length ? (
        <NewsList news={news} setNews={setNews}></NewsList>
      ) : (
        <h5>No Sources Found!</h5>
      )}
    </div>
  );
}
