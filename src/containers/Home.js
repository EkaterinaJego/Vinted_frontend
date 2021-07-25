import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Mainpart from "../components/Mainpart";
import Item from "../components/Item";
import "../components/home.css";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [offers, setOffers] = useState();

  const fetchData = async () => {
    const response = await axios.get(
      "https://lereacteur-vinted-api.herokuapp.com/offers"
    );
    setOffers(response.data.offers);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>The page is loading ...</div>
      ) : (
        <div>
          <Header />
          <Mainpart />
          <Item offers={offers} setOffers={setOffers} />
        </div>
      )}
    </>
  );
};

export default Home;
