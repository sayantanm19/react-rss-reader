import React, { useEffect, useState, useContext } from "react";
import { FavouritesContext } from "../contexts/FavouritesContext";

export default function ShowFavourites() {
  const [favourites, setFavourites] = useContext(FavouritesContext);

  // useEffect(() => {
  //   async function getFavourites() {
  //     let newsItems = [];
  //     for (let feed of sources) {
  //       if (feed.enabled) {
  //         // Parse the feed URL
  //         let parsedFeed = await parser.parseURL(feed.rsslink);
  //         // console.log(feed, parsedFeed);

  //         // Add the publication tag for every news item
  //         let tmpItems = parsedFeed.items.map((item) => ({
  //           ...item,
  //           publication: parsedFeed.title,
  //         }));

  //         // Add to the final array
  //         newsItems.push(...tmpItems);
  //       }
  //     }

  //     // Shuffle the items
  //     // newsItems = newsItems.sort(() => Math.random() - 0.5);

  //     // Sort on the basis of the date
  //     newsItems = newsItems.sort((a, b) => {
  //       return new Date(b.isoDate) - new Date(a.isoDate);
  //     });

  //     setNews(newsItems);
  //   }
  //   getFeeds();
  // }, []);

  return (
    <div>
      <h4>Favourite Entries</h4>
      <ul className="collection">
        {favourites.length > 0 ? (
          favourites.map((item, idx) => {
            // console.log(item);

            return (
              <li key={idx} className="collection-item">
                <h5>{item.title}</h5>
                <b>{item.publication}</b>{" "}
                {new Date(item.isoDate).toLocaleTimeString()}
                <p>{item.contentSnippet}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="waves-effect waves-light btn"
                >
                  Read Article
                </a>
                <button
                  className="waves-effect waves-light btn"
                  onClick={() => deleteFavourite(item)}
                >
                  Delete
                </button>
              </li>
            );
          })
        ) : (
          <h5>You have not favourited anything!</h5>
        )}
      </ul>
    </div>
  );

  function deleteFavourite(favItem) {
    let newFavs = favourites.filter((fav) => fav.guid != favItem.guid);
    setFavourites(newFavs);
  }
}
