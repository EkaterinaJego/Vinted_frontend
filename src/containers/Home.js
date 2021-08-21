import React from "react";
import Mainpart from "../components/Mainpart";
import Items from "../components/Items";
import "../containers/home.css";

const Home = ({ offers, setOffers, isLoading, token, myUrl }) => {
  return (
    <>
      {isLoading ? (
        <div>The page is loading ...</div>
      ) : (
        <div>
          <Mainpart token={token} />
          <Items offers={offers} setOffers={setOffers} myUrl={myUrl} />
        </div>
      )}
    </>
  );
};

export default Home;
