import React from "react";

import Mainpart from "../components/Mainpart";
import Items from "../components/Items";
import "./home.css";

const Home = ({
  offers,
  setOffers,
  title,
  setTitle,
  isLoading,
  setIsLoading,
}) => {
  return (
    <>
      {isLoading ? (
        <div>The page is loading ...</div>
      ) : (
        <div>
          <Mainpart />
          <Items offers={offers} setOffers={setOffers} />
        </div>
      )}
    </>
  );
};

export default Home;
