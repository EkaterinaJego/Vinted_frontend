import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Mainpart from "../components/Mainpart";
import Items from "../components/Items";
import "./home.css";

const Home = ({ offers, setOffers, setFilteredOffers, filteredOffers }) => {
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://lereacteur-vinted-api.herokuapp.com/offers"
    );
    setOffers(response.data.offers);
    setFilteredOffers();
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
          <Mainpart />
          <Items
            offers={offers}
            setOffers={setOffers}
            filteredOffers={filteredOffers}
          />
        </div>
      )}
    </>
  );
};

export default Home;
