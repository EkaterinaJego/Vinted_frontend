import "./product.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Product = (props) => {
  const { id } = useParams();

  const [info, setInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      setInfo(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="product-body">
      {isLoading ? (
        <div>The page is loading ...</div>
      ) : (
        <div className="product-page">
          <div className="product-img">
            {info.product_pictures.map((picture, id) => {
              return (
                <div className="product_photo" key={id}>
                  <img src={picture.secure_url} alt="product" />;
                </div>
              );
            })}
          </div>
          <div className="product-info">
            <div className="product-price">{info.product_price}$</div>
            {info.product_details.map((detail, index) => {
              const keys = Object.keys(detail);
              return (
                <div key={index} className="product-details">
                  <span>{keys[0]}:</span>{" "}
                  <span className="marque-color">{detail[keys[0]]}</span>
                </div>
              );
            })}
            <div className="product-name-description">
              <div className="name">{info.product_name}</div>
              <div className="description">{info.product_description}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
