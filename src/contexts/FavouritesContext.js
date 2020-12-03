import React, { useState, createContext } from "react";

export const FavouritesContext = createContext();

export function FavouritesProvider(props) {
  const [favourites, setFavourites] = useState([
    // {
    //   title: "Item One",
    //   publication: "Pub 1",
    //   isoDate: Date.now(),
    //   contentSnippet: "Snip123",
    //   link: "/",
    // },
    // {
    //   title: "Item Two",
    //   publication: "Pub 2",
    //   isoDate: Date.now(),
    //   contentSnippet: "Snip123",
    //   link: "/",
    // },
    // {
    //   title: "Item Three",
    //   publication: "Pub 3",
    //   isoDate: Date.now(),
    //   contentSnippet: "Snip123",
    //   link: "/",
    // },
  ]);

  return (
    <FavouritesContext.Provider value={[favourites, setFavourites]}>
      {props.children}
    </FavouritesContext.Provider>
  );
}
