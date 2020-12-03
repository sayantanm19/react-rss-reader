import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import ShowFeed from "./components/ShowFeed";
import ShowFavourites from "./components/Favourites";
import NavBar from "./components/NavBar";
import Preferences from "./components/Preferences";

import { SourcesProvider } from "./contexts/SourcesContext";
import { FavouritesProvider } from "./contexts/FavouritesContext";
import { PreferencesProvider } from "./contexts/PreferencesContext";

function App() {
  return (
    <PreferencesProvider>
      <FavouritesProvider>
        <SourcesProvider>
          <Router>
            <div className="App">
              <NavBar></NavBar>
              <div className="container">
                <Switch>
                  <Route path="/" exact component={ShowFeed}></Route>
                  <Route path="/preferences" component={Preferences}></Route>

                  <Route path="/favourites" component={ShowFavourites}></Route>
                </Switch>
              </div>
            </div>
          </Router>
        </SourcesProvider>
      </FavouritesProvider>
    </PreferencesProvider>
  );
}

export default App;
