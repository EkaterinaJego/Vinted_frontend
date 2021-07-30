import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Offer from "./containers/Offer";
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faList } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faList);

export default function App() {
  // const { price-desc } = useParams();
  // const { price-asc } = useParams()
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [title, setTitle] = useState("");
  const [offers, setOffers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(500);
  const [sort, setSort] = useState("");
  const [switchValue, setSwitchValue] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?title=${title}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${sort}`
      );
      setOffers(response.data.offers);
      setIsLoading(false);
    };
    fetchData();
  }, [title, priceMin, priceMax, sort]);

  const handleLogin = (token) => {
    Cookies.set("token", token);
    setToken("token");
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setToken("");
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handlePriceMax = (event) => {
    setPriceMax(event.target.value);
  };

  const handlePriceMin = (event) => {
    setPriceMin(event.target.value);
  };

  const handleToggle = () => {
    if (switchValue === false) {
      setSwitchValue(true);
      handleSortAsc();
    } else {
      setSwitchValue(false);
      handleSortDesc();
    }
  };

  const handleSortAsc = () => {
    setSort("price-asc");
  };

  const handleSortDesc = () => {
    setSort("price-desc");
  };

  return (
    <Router>
      <Header
        token={token}
        handleLogout={handleLogout}
        offers={offers}
        setOffers={setOffers}
        title={title}
        handleTitle={handleTitle}
        // priceMax={priceMax}
        // priceMin={priceMin}
        // setPriceMin={setPriceMin}
        // setPriceMax={setPriceMax}
        handlePriceMax={handlePriceMax}
        handlePriceMin={handlePriceMin}
        setSort={setSort}
        swithValue={switchValue}
        setSwitchValue={setSwitchValue}
        handleToggle={handleToggle}
        handleSortAsc={handleSortAsc}
        handleSortDesc={handleSortDesc}
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
            title={title}
            setTitle={setTitle}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Route>
      </Switch>
    </Router>
  );
}
