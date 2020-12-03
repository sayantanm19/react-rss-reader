import React, { useState, useContext } from "react";
import { SourcesContext } from "../contexts/SourcesContext";
import { PreferencesContext } from "../contexts/PreferencesContext";

export default function Preferences() {
  const [sources, setSources] = useContext(SourcesContext);
  const [preferences, setPreferences] = useContext(PreferencesContext);

  const [addEntryName, setAddEntryName] = useState("");
  const [addEntryLink, setAddEntryLink] = useState("");

  return (
    <div>
      <h5>News Sources</h5>
      {sources ? (
        sources.map((source, idx) => {
          // <li key={idx}>{source.name}</li>
          return (
            <div key={idx}>
              <label>
                <input
                  type="checkbox"
                  checked={source.enabled ? "checked" : ""}
                  onChange={() => toggleSource(source.name)}
                />
                <span>{source.name}</span>
              </label>
            </div>
          );
        })
      ) : (
        <p>No Sources Found</p>
      )}
      <p>There are {sources.length} available news sources.</p>
      <h5>Add a new source</h5>

      <div className="input-field">
        <input
          placeholder="CNET"
          id="add_name"
          type="text"
          value={addEntryName}
          onChange={(e) => setAddEntryName(e.target.value)}
        />
        <label className="active" htmlFor="firstadd_source_name">RSS Name</label>
      </div>
      <div className="input-field">
        <input
          placeholder="https://www.cnet.com/rss/news/"
          id="add_link"
          type="text"
          value={addEntryLink}
          onChange={(e) => setAddEntryLink(e.target.value)}
        />
        <label className="active" htmlFor="firstadd_source_name">RSS URL</label>
        <button onClick={addNewEntry} className="btn">
          Add New Source
        </button>
      </div>

      <h5>Maximum number of news items to display</h5>
      <div className="input-field">
        <input
          id="max_items"
          type="number"
          value={preferences.maxItems}
          onChange={(e) => setPreferences({...preferences, maxItems: e.target.value})}
        />
        <label className="active" htmlFor="max_items">Max Items</label>
        {/* <button onClick={addNewEntry} className="btn">
          Add New Source
        </button> */}
      </div>
    </div>
  );

  function addNewEntry() {
    let newSource = {
      name: addEntryName,
      rsslink: addEntryLink,
      enabled: true,
    };

    setSources(sources.concat(newSource));
  }

  function toggleSource(sxTitle) {
    let newSources = sources.map((source) => {
      if (source.name === sxTitle) {
        return { ...source, enabled: !source.enabled };
      } else return source;
    });
    setSources(newSources);
  }
}
