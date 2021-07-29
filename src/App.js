import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "./components/Header";
import { useState } from "react";
import Offer from "./containers/Offer";
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faList } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faList);

export default function App() {
  const [token, setToken] = useState(Cookies.get("token") || "");

  const [offers, setOffers] = useState();
  const [filteredOffers, setFilteredOffers] = useState();

  const handleLogin = (token) => {
    Cookies.set("token", token);
    setToken("token");
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setToken("");
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
    let result = [];
    result = offers.filter((offer) => {
      return offer.product_name.search(event.target.value) !== -1;
    });
    setFilteredOffers(result);
  };

  return (
    <Router>
      <Header
        token={token}
        handleLogout={handleLogout}
        offers={offers}
        setOffers={setOffers}
        filteredOffers={filteredOffers}
        setFilteredOffers={setFilteredOffers}
        handleSearch={handleSearch}
      />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/user/signup">
          <Signup handleLogin={handleLogin} />
        </Route>
        <Route path="/user/login">
          <Login handleLogin={handleLogin} />
        </Route>
        <Route exact path="/">
          <Home
            offers={offers}
            setOffers={setOffers}
            filteredOffers={filteredOffers}
            setFilteredOffers={setFilteredOffers}
            handleSearch={handleSearch}
          />
        </Route>
      </Switch>
    </Router>
  );
}
