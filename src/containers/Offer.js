import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";

const Offer = (props) => {
  const { id } = useParams();

  const [info, setInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const result = await axios.get(
      `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
    );
    setInfo(result.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      Offer {id}
      <Header />
      {isLoading ? (
        <div>The page is loading ...</div>
      ) : (
        <div
          className="item_info"
          style={{ width: "100%", height: "400px", display: "flex" }}
        >
          <div className="info_part" style={{ width: "50%", height: "200px" }}>
            {info.product_name}
            {info.product_price}
          </div>
          <div>
            {info.product_details.map((detail, index) => {
              console.log(detail);
              const keys = Object.keys(detail);
              return (
                <div key="index">
                  {keys[0]}: {detail[keys[0]]}
                </div>
              );
            })}
          </div>
          {info.product_pictures.map((picture, index) => {
            return (
              <div className="product_photo">
                <img src={picture.secure_url} alt="product" />;
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Offer;
