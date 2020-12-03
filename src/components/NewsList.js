import React, { useState, useContext } from "react";

import { FavouritesContext } from "../contexts/FavouritesContext";
import { PreferencesContext } from "../contexts/PreferencesContext";

import "./NewsList.css";

const MAX_CONTENT_LENGTH = 150;

export default function NewsList({ news, setNews }) {
  const [favourites, setFavourites] = useContext(FavouritesContext);
  const [preferences, setPreferences] = useContext(PreferencesContext);

  return (
    <>
      <div className="row">
        <div className="col s8">
          <h4>Feed</h4>
        </div>
        <div className="col s4 show-details">
          Show Details
          <div className="switch">
            <label>
              Off
              <input
                type="checkbox"
                checked={preferences.showDetails}
                onChange={() =>
                  setPreferences({
                    ...preferences,
                    showDetails: !preferences.showDetails,
                  })
                }
              />
              <span className="lever"></span>
              On
            </label>
          </div>
        </div>
      </div>

      <ul className="collection">
        {news.length > 0 ? (
          news.map((item, idx) => {
            return (
              <li key={idx} className="collection-item">
                <div className="row">
                  <div className="col s11">
                    <span className="news-title">{item.title}</span>
                    <p className="news-snippet">
                      {preferences.showDetails
                        ? trimContent(item.contentSnippet)
                        : null}
                    </p>
                    <div className="row">
                      <div className="col s5">
                        <b>{item.publication}</b>{" "}
                      </div>
                      <div className="col s5">
                        {new Date(item.isoDate).toLocaleTimeString()}
                      </div>
                      <div className="col s2">
                        <i
                          className="material-icons favourite-icon"
                          style={{
                            color: item.favourited ? "red" : "black",
                          }}
                          onClick={() => addToFavourites(item)}
                        >
                          favorite
                        </i>
                      </div>
                    </div>
                  </div>
                  <div className="col s1">
                    <i
                      className="material-icons read-icon"
                      onClick={() => window.open(item.link)}
                    >
                      navigate_next
                    </i>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <h5>No items found...</h5>
        )}
      </ul>
    </>
  );

  function trimContent(snippet) {
    if (snippet.length > MAX_CONTENT_LENGTH) {
      snippet = snippet.substring(0, MAX_CONTENT_LENGTH);
      snippet += " [...]";
    }
    return snippet;
  }

  function addToFavourites(newFav) {
    if (newFav.favourited) {
      // Remove from favourites
      let newFavs = favourites.filter((item) => newFav.guid !== item.guid);
      setFavourites(newFavs);
    } else {
      newFav = { ...newFav, favourited: true };
      setFavourites(favourites.concat(newFav));
    }

    let newNews = news.map((item) => {
      // return {...item, favourited: item.guid === newFav.guid ? !item.favourited : item.favourited}
      return item.guid === newFav.guid
        ? { ...item, favourited: !item.favourited }
        : item;
    });
    setNews(newNews);
  }
}
