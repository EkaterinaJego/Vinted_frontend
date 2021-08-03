import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import Offer from "./containers/Offer";
import Home from "./containers/Home";
import Publish from "./containers/Publish";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faList } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faList);

export default function App() {
  let history = useHistory();
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [title, setTitle] = useState("");
  const [offers, setOffers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [rangeValues, setRangeValues] = useState([0, 100]);
  // const [rangeFinalValues, setFinalRangeValues] = useState(0, 100);
  // const [sort, setSort] = useState(false);
  // const [artTitle, setArtTitle] = useState("");
  // const [artDescription, setArtDescription] = useState("");
  // const [artPrice, setArtPrice] = useState("");
  // const [artCondition, setArtCondition] = useState("");
  // const [artCity, setArtCity] = useState("");
  // const [artBrand, setArtBrand] = useState("");
  // const [artSize, setArtSize] = useState("");
  // const [artColor, setArtColor] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?title=${title}&priceMin=${rangeValues[0]}&priceMax=${rangeValues[1]}`
      );
      setOffers(response.data.offers);
      setIsLoading(false);
    };
    fetchData();
  }, [title, rangeValues]);

  const handleRange = (values) => {
    setRangeValues(values);
  };

  const handleLogin = (token) => {
    Cookies.set("token", token);
    setToken("token");
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setToken("");

    <Redirect to="/publish" />;
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
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
        handleRange={handleRange}
        rangeValues={rangeValues}
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
        <Route path="/publish">
          <Publish token={token} />
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
