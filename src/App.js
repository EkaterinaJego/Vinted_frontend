import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "./components/Header";
import * as qs from "qs";
import { useState, useEffect } from "react";
import Product from "./containers/Product";
import Home from "./containers/Home";
import Payment from "./containers/Payment";
import Publish from "./containers/Publish";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faList,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faList, faArrowDown, faArrowUp);

export default function App() {
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [title, setTitle] = useState("");
  const [offers, setOffers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [rangeValues, setRangeValues] = useState([0, 10000]);
  const [sort, setSort] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = qs.stringify({
        title: title,
        priceMin: rangeValues[0],
        priceMax: rangeValues[1],
        sort: sort ? "price-asc" : "price-desc",
      });
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?${queryParams}`
      );
      setOffers(response.data.offers);
      // console.log("App / setInfo = ", setInfo);
      setIsLoading(false);
    };
    fetchData();
  }, [title, rangeValues, sort]);

  const handleRange = (values) => {
    setRangeValues(values);
  };

  const handleLogin = (token) => {
    // console.log("HANDLELOGIN");
    // console.log("token = ", token);
    Cookies.set("token", token);
    setToken(token);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleSort = (event) => {
    setSort(event.target.checked);
  };

  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        title={title}
        handleTitle={handleTitle}
        rangeValues={rangeValues}
        handleRange={handleRange}
        sort={sort}
        handleSort={handleSort}
      />
      <Switch>
        <Route path="/offer/:id">
          <Product info={info} setInfo={setInfo} />
        </Route>
        <Route path="/user/signup">
          <Signup handleLogin={handleLogin} />
        </Route>
        <Route path="/user/login">
          <Login handleLogin={handleLogin} />
        </Route>
        <Route path="/publish">
          <Publish token={token} />
        </Route>
        <Route path="/payment">
          <Payment info={info} />
        </Route>
        <Route exact path="/">
          <Home
            offers={offers}
            setOffers={setOffers}
            isLoading={isLoading}
            token={token}
          />
        </Route>
      </Switch>
    </Router>
  );
}
