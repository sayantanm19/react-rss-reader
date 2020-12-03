import React, { useEffect, useState, useContext } from "react";

import { Link } from "react-router-dom";

import M from "materialize-css/dist/js/materialize.min.js";

export default function NavBar() {
  // Initialize sidebar
  useEffect(() => {
    var elem = document.querySelector(".sidenav");
    var instance = M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250,
    });
  }, []);

  return (
    <>
      <nav className="light-green">
        <div className="nav-wrapper container">
          <span className="brand-logo">
            <Link to="/">RSS Feed Reader</Link>
            <i className="large material-icons">rss_feed</i>
          </span>
          <a href="/" data-target="mobile-sidebar" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/">Your Feed</Link>
            </li>
            <li>
              <Link to="/favourites">Favourites</Link>
            </li>
            <li>
              <Link to="/preferences">Preferences</Link>
            </li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-sidebar">
        <li>
          <div className="user-view">
            <div
              className="drawer-background"
              style={{ height: "35px" }}
            >
              <h5>RSS Reader</h5>
            </div>
          </div>
        </li>
        <li>
          <Link to="/">Your Feed</Link>
        </li>
        <li>
          <Link to="/favourites">Favourites</Link>
        </li>
        <li>
          <Link to="/preferences">Preferences</Link>
        </li>
      </ul>
    </>
  );
}
