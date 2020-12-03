import React, { useState, createContext } from "react";

export const PreferencesContext = createContext();

export function PreferencesProvider(props) {
  const [preferences, setPreferences] = useState(
    {
      theme: "white",
      maxItems: 40,
      showDetails: true
    },
  );

  return (
    <PreferencesContext.Provider value={[preferences, setPreferences]}>
      {props.children}
    </PreferencesContext.Provider>
  );
}
